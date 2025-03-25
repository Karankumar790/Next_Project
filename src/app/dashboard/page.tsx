"use client";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  content: string;
  createdAt?: string; // Make createdAt optional
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setPosts(data.posts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl text-black font-bold">Welcome to Dashboard 🚀</h1>
      <p className="text-2xl  mt-2 text-gray-700">Please Click on Home!</p>

      <h2 className="text-2xl font-semibold mt-6">All Posts</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 w-full max-w-2xl">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500">
                Posted by <strong>{post.userId.username}</strong>{" "}
                {post.createdAt ? `on ${new Date(post.createdAt).toLocaleString()}` : ""}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
}
