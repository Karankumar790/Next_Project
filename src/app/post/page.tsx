"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/Authcontext";

export default function PostsPage() {
  const auth = useAuth();
  const user = auth?.user;

  interface Post {
    _id: string;
    content: string;
    likes: { userId: string }[];
    comments: { text: string }[];
  }

  const [posts, setPosts] = useState<Post[]>([]); 
  const [content, setContent] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/post");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        console.log("Fetched posts:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error("Unexpected API response:", data);
          setPosts([]); 
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        alert("Failed to load posts. Please try again.");
      }
    }
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!token) {
      alert("❌ You are not authorized. Please log in.");
      return;
    }

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user?.id, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      setContent("");
      alert("✅ Post Created Successfully!");

      setPosts((prevPosts) => [data.post, ...prevPosts]); 
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`❌ Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Post Creation Form */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Create a Post</h2>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Write something..."
        />
        <button 
          onClick={handlePost} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md mt-3 transition duration-200 ease-in-out"
          disabled={!token} 
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">All Posts</h2>
        
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">No posts available.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <p className="text-gray-800">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

