import { NextResponse } from "next/server";
import {connectDB} from "@/utils/db";
import Post from "@/models/post";

export async function GET() {
  await connectDB();
  const posts = await Post.find().populate("userId", "username");
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req: Request) {
  await connectDB();
  const { userId, content } = await req.json();

  const newPost = new Post({ userId, content });
  await newPost.save();

  return NextResponse.json({ message: "Post Created!" }, { status: 201 });
}
