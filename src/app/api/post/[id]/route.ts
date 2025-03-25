// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Post from "@/models/post";
// import mongoose from "mongoose";

// // ✅ Update a Post (PUT)
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();
//   const { id } = params;
//   const { content } = await req.json();

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { content },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     return NextResponse.json({ post: updatedPost }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error updating post", errors: error },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete a Post (DELETE)
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   if (!params.id) {
//     return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
//   }

//   await connectDB();
//   console.log("✅ Connected to DB");

//   if (!mongoose.Types.ObjectId.isValid(params.id)) {
//     return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
//   }

//   const post = await Post.findById(params.id);
//   console.log("🟡 Found Post:", post);

//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   try {
//     await Post.findByIdAndDelete(params.id);
//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Server error", errors: error },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import mongoose from "mongoose";

// ✅ Update a Post (PUT)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ Correct params structure
) {
  await connectDB();
  const { id } = params; // ✅ Corrected params extraction

  try {
    const { content } = await req.json();

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
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Error updating post", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ Delete a Post (DELETE)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ Correct params structure
) {
  await connectDB();
  const { id } = params; // ✅ Corrected params extraction

  if (!id) {
    return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
  }

  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    await Post.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
