import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/user";

export async function POST(req: Request) {
  await connectDB();
  const { username, email, phone, password } = await req.json();

  if (!username || !email || !phone || !password) {
    return NextResponse.json(
      { error: "All fields are required!" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  await newUser.save();

  return NextResponse.json(
    { message: "User registered successfully!" },
    { status: 201 }
  );
}
