"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/Authcontext";

export default function Profile() {
  const auth = useAuth();
  const user = auth?.user;
  const [profile, setProfile] = useState({ bio: "", skills: [] as string[], location: "" });
  // useEffect(() => {
  //   async function fetchProfile() {
  //     const res = await fetch("/api/profile", { headers: { userId: user?.id } });
  //     const data = await res.json();
  //     setProfile(data);
  //   }
  //   if (user) fetchProfile();
  // }, [user]);
  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile({
        bio: data?.bio || "",
        skills: data?.skills || "",
        location: data?.location || "",
      });
    }
  
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile, userId: user?.id }),
    });
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black  shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full p-2 mb-2 border rounded-md" />
        <input type="text" placeholder="Skills (comma separated)" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(",") })} className="w-full p-2 mb-2 border rounded-md" />
        <input type="text" placeholder="Location" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="w-full p-2 mb-2 border rounded-md" />
        {/* <input type="text" placeholder="GitHub" value={profile.social.github} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, github: e.target.value } })} className="w-full p-2 mb-2 border rounded-md" /> */}
        {/* <input type="text" placeholder="LinkedIn" value={profile.social.linkedin} onChange={(e) => setProfile({ ...profile, social: { ...profile.social, linkedin: e.target.value } })} className="w-full p-2 mb-2 border rounded-md" /> */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Save</button>
      </form>
    </div>
  );
}
