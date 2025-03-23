"use client";
import { useAuth } from "@/context/Authcontext";

export default function Dashboard() {
  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to my project 🚀</h1>
      <p className="mt-2 text-gray-700">You are logged in!</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </div>
  );
}
