import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
  userId: string;
  content: string;
  likes: string[];
  comments: { userId: string; text: string }[];
}

const PostSchema = new Schema<IPost>({
  userId: { type: String, ref: "User", required: true },
  content: { type: String, required: true },
  likes: { type: [String], default: [] }, // Stores user IDs who liked the post
  comments: [
    {
      userId: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
