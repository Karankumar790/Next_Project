// import mongoose, { Schema, Document } from "mongoose";

// interface IProfile extends Document {
//   userId: mongoose.Types.ObjectId;
//   bio: string;
//   skills: string[];
//   location: string;
//   social: { github: string; linkedin: string };
// }

// const ProfileSchema = new Schema<IProfile>({
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   bio: { type: String },
//   skills: { type: [String] },
//   location: { type: String },
//   social: {
//     github: { type: String },
//     linkedin: { type: String },
//   },
// });

// export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);


// src/models/profile.ts
import mongoose, { Schema, Document } from "mongoose";

interface Profile extends Document {
  userId: string;
  bio: string;
  skills: string[];
  location: string;
}

const profileSchema = new Schema<Profile>({
  userId: { type: String, required: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true },
  location: { type: String, required: true },
});

const Profile = mongoose.models.Profile || mongoose.model<Profile>("Profile", profileSchema);

export default Profile;
