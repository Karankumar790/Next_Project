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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import connectDB from "@/lib/db";
// import Post from "@/models/post";
// import mongoose from "mongoose";

// // ✅ Update a Post (PUT)
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } } // ✅ Correct params structure
// ) {
//   await connectDB();
//   const { id } = params; // ✅ Corrected params extraction

//   try {
//     const { content } = await req.json();

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
//     console.error("PUT Error:", error);
//     return NextResponse.json(
//       { error: "Error updating post", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete a Post (DELETE)
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } } // ✅ Correct params structure
// ) {
//   await connectDB();
//   const { id } = params; // ✅ Corrected params extraction

//   if (!id) {
//     return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
//   }

//   const post = await Post.findById(id);
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   try {
//     await Post.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import connectDB from "@/lib/db";
// import Post from "@/models/post";
// import mongoose from "mongoose";

// // ✅ Update a Post (PUT)
// export async function PUT(
//   req: NextRequest,
//   context: { params: { id: string } } // ✅ Fix: Correct context structure
// ) {
//   await connectDB();
//   const { id } = context.params; // ✅ Fix: Access params from context

//   try {
//     const { content } = await req.json();

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
//     console.error("PUT Error:", error);
//     return NextResponse.json(
//       { error: "Error updating post", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete a Post (DELETE)
// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } } // ✅ Fix: Correct context structure
// ) {
//   await connectDB();
//   const { id } = context.params; // ✅ Fix: Access params from context

//   if (!id) {
//     return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
//   }

//   const post = await Post.findById(id);
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   try {
//     await Post.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import connectDB from "@/lib/db";
// import Post from "@/models/post";
// import mongoose from "mongoose";

// // ✅ Update a Post (PUT)
// export async function PUT(
//   req: NextRequest,
//   context: { params: { id: string } } // ✅ Fix: Correct context structure
// ) {
//   await connectDB();
//   const id = context.params?.id; // ✅ Fix: Ensure params exist before using them

//   if (!id) {
//     return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
//   }

//   try {
//     const { content } = await req.json();

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
//     console.error("PUT Error:", error);
//     return NextResponse.json(
//       { error: "Error updating post", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete a Post (DELETE)
// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } } // ✅ Fix: Correct context structure
// ) {
//   await connectDB();
//   const id = context.params?.id; // ✅ Fix: Ensure params exist before using them

//   if (!id) {
//     return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
//   }

//   const post = await Post.findById(id);
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   try {
//     await Post.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import connectDB from "@/lib/db";
// import Post from "@/models/post";
// import mongoose from "mongoose";

// // Define a more explicit type for the route context
// type RouteContext = {
//   params: {
//     id: string;
//   };
// };

// // ✅ Update a Post (PUT)
// export async function PUT(
//   req: NextRequest,
//   context: RouteContext
// ) {
//   await connectDB();
//   const id = context.params.id;

//   if (!id) {
//     return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
//   }

//   try {
//     const { content } = await req.json();

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
//     console.error("PUT Error:", error);
//     return NextResponse.json(
//       { error: "Error updating post", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Delete a Post (DELETE)
// export async function DELETE(
//   req: NextRequest,
//   context: RouteContext
// ) {
//   await connectDB();
//   const id = context.params.id;

//   if (!id) {
//     return NextResponse.json({ error: "Missing Post ID" }, { status: 400 });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
//   }

//   const post = await Post.findById(id);
//   if (!post) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }

//   try {
//     await Post.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Post deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/post";
import mongoose from "mongoose";

// ✅ Fix: Use correct Next.js Route Handler Context typing
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } // 🔥 Corrected typing
): Promise<NextResponse> {
  try {
    await connectDB();

    if (!params?.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
    }

    // ✅ Fix: Parse JSON properly
    const body = await req.json();
    if (!body?.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      params.id,
      { content: body.content },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ✅ Fixed DELETE function
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // 🔥 Corrected typing
): Promise<NextResponse> {
  try {
    await connectDB();

    if (!params?.id || !mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(params.id);
    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
