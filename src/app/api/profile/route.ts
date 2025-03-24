import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Profile from "@/models/profile";

// Named export for GET method
export async function GET(req: Request) {
  await connectDB();
  
  const userId = req.headers.get("userId");
  
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const profile = await Profile.findOne({ userId });

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile, { status: 200 });
}

// Named export for POST method
export async function POST(req: Request) {
  await connectDB();
  
  const { userId, bio, skills, location } = await req.json();

  // Validate the required fields
  if (!userId || !bio || !skills || !location ) {
    return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
  }

  let profile = await Profile.findOne({ userId });

  if (profile) {
    // Update existing profile
    profile.bio = bio;
    profile.skills = skills;
    profile.location = location;
  } else {
    // Create new profile
    profile = new Profile({ userId, bio, skills, location });
  }

  await profile.save();

  return NextResponse.json({ message: "Profile updated!" }, { status: 200 });
}