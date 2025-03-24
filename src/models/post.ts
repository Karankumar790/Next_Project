import mongoose, { Schema, Document, Types } from "mongoose";

interface IPost extends Document {
  userId: Types.ObjectId; // ✅ Use Types.ObjectId instead of string
  content: string;
  likes: Types.ObjectId[]; // ✅ Use Types.ObjectId array
  comments: { userId: Types.ObjectId; text: string }[]; // ✅ Use Types.ObjectId
}

const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Correctly defined
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // ✅ Use Schema.Types.ObjectId[]
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Correct type
      text: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
