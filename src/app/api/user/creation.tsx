import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

const Prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await req.json();
    const { Email, Password, Address } = user;

    const emailExists = await Prisma.user.findUnique({
      where: {
        Email: Email,
      },
    });
    if (emailExists) {
      return NextResponse.json(
        { user: null, message: "Email already in use" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(Password, 10);
    const newUser = await Prisma.user.create({
      data: {
        Email,
        Password: passwordHash,
        Address: Address ? Address : null,
      },
    });
    return NextResponse.json(
      { user: newUser, message: "Account successfully created!" },
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
