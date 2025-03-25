import  connectDB  from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/post";
import { verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = await verifyToken(req);
  if (!user || !("userId" in user))
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

  const { text } = await req.json();
  if (!text)
    return NextResponse.json(
      { error: "Comment cannot be empty" },
      { status: 400 }
    );

  const post = await Post.findById(params.id);
  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  post.comments.push({ userId: user.userId, text });
  await post.save();

  return NextResponse.json(
    { message: "Comment added!", post },
    { status: 200 }
  );
}
