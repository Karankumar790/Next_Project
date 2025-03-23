"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Posts() {
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

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handlePost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, content }),
    });
    setContent("");
    alert("Post Created!");
  };

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", userId: user?.id }),
    });
    alert("Liked/Unliked!");
  };

  const handleComment = async (postId: string, comment: string) => {
    await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "comment", userId: user?.id, text: comment }),
    });
    alert("Comment Added!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Write something..." />
      <button onClick={handlePost} className="w-full bg-blue-500 text-white p-2 rounded-md">Post</button>

      {posts.map((post) => (
        <div key={post._id} className="mt-4 p-4 bg-gray-100 rounded-md">
          <p>{post.content}</p>
          <button onClick={() => handleLike(post._id)} className="bg-green-500 text-white px-4 py-1 rounded-md mt-2">
            Like ({post.likes.length})
          </button>

          <div className="mt-2">
            <input type="text" placeholder="Add a comment" onKeyDown={(e) => e.key === "Enter" && handleComment(post._id, e.currentTarget.value)} className="w-full p-1 border rounded-md" />
          </div>

          <div className="mt-2">
            {post.comments.map((comment, index) => (
              <p key={index} className="text-gray-600 text-sm">{comment.text}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
