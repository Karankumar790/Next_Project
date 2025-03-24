import Post from "@/models/post";
import { verifyToken } from "@/utils/auth";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
// import {Post} from "@/models/post";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await verifyToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const liked = post.likes.includes(user.userId);
  if (liked) {
    post.likes = post.likes.filter((id: string) => id !== user.userId);
  } else {
    post.likes.push(user.userId);
  }

  await post.save();
  return NextResponse.json({ message: liked ? "Like removed" : "Post liked", post }, { status: 200 });
}
