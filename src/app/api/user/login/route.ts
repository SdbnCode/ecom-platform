import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import * as z from "zod";
import Prisma from "../../../lib/prisma";

//User validation schema
const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const loginData = await req.json();
    const { email, password } = LoginSchema.parse(loginData);

    // Check if user exists in the database
    const user = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { user: null, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Check if the password matches
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { user: null, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Return success without sending back the password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...rest } = user;

    return NextResponse.json(
      { user: rest, message: "Login successful!" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { user: null, message: "An error occurred" },
      { status: 500 },
    );
  }
}
