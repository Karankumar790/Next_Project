import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Post from "@/models/post";
import mongoose from "mongoose";

// ✅ Update a Post (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  const { content } = await req.json();

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

// ✅ Delete a Post (DELETE)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("Incoming DELETE request for Post ID:", params.id); // ✅ Log the ID

  if (!params.id) {
    console.log("🔴 Error: Post ID is missing");
    return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
  }

  await connectDB();
  console.log("✅ Connected to DB");

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    console.log("🔴 Invalid ObjectId:", params.id);
    return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
  }

  const post = await Post.findById(params.id);
  console.log("🟡 Found Post:", post);

  if (!post) {
    console.log("🔴 Post not found in DB:", params.id);
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    await Post.findByIdAndDelete(params.id);
    console.log("🟢 Successfully Deleted Post:", params.id);
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔴 Error deleting post:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
