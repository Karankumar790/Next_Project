import { NextRequest, NextResponse } from "next/server";
import  connectDB from "@/lib/db";
import Post from "@/models/post";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Populate userId to include username & email
    const posts = await Post.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Extract user from the token
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Create the post with the authenticated user ID
    const newPost = await Post.create({ userId: user._id, content });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
