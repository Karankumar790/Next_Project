import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/post";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { action, userId, text } = await req.json();
  const post = await Post.findById(params.id);

  if (!post) return NextResponse.json({ error: "Post not found!" }, { status: 404 });

  if (action === "like") {
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id: string) => id !== userId);
    }
  }

  if (action === "comment") {
    post.comments.push({ userId, text });
  }

  await post.save();
  return NextResponse.json({ message: "Post updated!" }, { status: 200 });
}
