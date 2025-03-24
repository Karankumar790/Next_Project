"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/Authcontext";

export default function MyPostsPage() {
  const auth = useAuth();
  const user = auth?.user;
  const [posts, setPosts] = useState<{ _id: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");

    async function fetchUserPosts() {
      try {
        const res = await fetch("/api/post/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [user]);

  // ✅ Handle Post Update
  const handleEdit = async (postId: string) => {
    try {
      const res = await fetch(`/api/post/${postId}`, {  // ✅ FIXED API PATH
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!res.ok) throw new Error("Failed to update post");

      const updatedPost = await res.json();
      setPosts(posts.map((post) => (post._id === postId ? updatedPost.post : post)));
      setEditMode(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
  
    try {
      const res = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      const data = await res.json(); // ✅ Log actual server response
  
      if (!res.ok) {
        console.error("🔴 Failed to delete post:", data);
        throw new Error(data.error || "Failed to delete post");
      }
  
      console.log("🟢 Post deleted successfully:", data);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl text-black font-semibold mb-4">My Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="p-4 bg-gray-100 rounded-md mb-4">
            {editMode === post._id ? (
              <div>
                <textarea
                  className="w-full p-2 border rounded-md text-black"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleEdit(post._id)} className="bg-green-500 text-white  p-2 rounded-md mt-2 mr-2">
                  Save
                </button>
                <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white p-2 rounded-md">
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="text-black">{post.content}</p>
                <button onClick={() => { setEditMode(post._id); setEditContent(post.content); }} className="bg-blue-500 text-white p-2 rounded-md mt-2 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white p-2 rounded-md">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
