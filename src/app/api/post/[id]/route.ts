import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/post';
import mongoose from 'mongoose';

// ✅ Corrected PUT function with proper context typing
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // Properly typed context
): Promise<NextResponse> {
  try {
    await connectDB();

    const { id } = context.params;  // Extract `id` from `context.params`

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 });
    }

    // Parse the request body
    const body = await req.json();
    if (!body?.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id, // Use `id` directly here
      { content: body.content },
      { new: true }
    );

    // Handle if post not found
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Post updated successfully', post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      {
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ✅ Corrected DELETE function with proper context typing
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } } // Properly typed context
): Promise<NextResponse> {
  try {
    await connectDB();

    const { id } = context.params; // Extract `id` from `context.params`

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 });
    }

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(id); // Use `id` directly here
    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      {
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
