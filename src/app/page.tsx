export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to my project 🚀</h1>
      <p className="mt-4 text-gray-700 max-w-xl">
        This is a platform where developers can share their thoughts, collaborate, and build a strong network.  
        Create your profile, share posts, and connect with the my network!
      </p>

      <div className="mt-6">
        {/* <a href="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-md mr-4 hover:bg-blue-700">Get Started</a> */}
        {/* <a href="/login" className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-800">Login</a> */}
      </div>
    </div>
  );
}
