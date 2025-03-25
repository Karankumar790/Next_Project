"use client";
import { useAuth } from "@/context/Authcontext";
import Link from "next/link";

export default function Navbar() {
  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Next Project</h1>
        
        <nav>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          {user ? (
            <>
              <Link href="/post" className="mr-4 hover:underline">Posts</Link>
              <Link href="/mypost" className="mr-4 hover:underline">My Posts</Link>
              <button onClick={logout} className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="mr-4 hover:underline">Signup</Link>
              <Link href="/login" className="hover:underline">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
