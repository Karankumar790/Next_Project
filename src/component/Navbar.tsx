"use client";
import { useAuth } from "@/context/Authcontext";

export default function Navbar() {
  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Next Project</h1>
        
        <nav>
          <a href="/" className="mr-4 hover:underline">Home</a>
          {user ? (
            <>
              <a href="/profile" className="mr-4 hover:underline">Profile</a>
              <a href="/post" className="mr-4 hover:underline">Posts</a>
              <a href="/mypost" className="mr-4 hover:underline">My Posts</a>
              <button onClick={logout} className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <a href="/signup" className="mr-4 hover:underline">Signup</a>
              <a href="/login" className="hover:underline">Login</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
