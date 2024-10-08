import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import Prisma from "../../../lib/prisma";

//User validation schema
const UserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  address: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await req.json();
    const { email, password, address } = UserSchema.parse(user);

    // Check if the email already exists in the database
    const emailExists = await Prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      return NextResponse.json(
        { user: null, message: "Email already in use" },
        { status: 409 },
      );
    }

    // Hash the password before storing it in the database
    const passwordHash = await hash(password, 10);

    // Create a new user in the database
    const newUser = await Prisma.user.create({
      data: {
        email,
        password: passwordHash,
        address: address ? address : null,
      },
    });

    // Don't send the hashed password back to the client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Account successfully created!" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { user: null, message: "An error occurred" },
      { status: 500 },
    );
  }
}
