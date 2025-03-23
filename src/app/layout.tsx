// import { AuthProvider } from "@/context/Authcontext";
// import "./globals.css";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <div className="min-h-screen flex flex-col">
//             {/* Navbar */}
//             <header className="bg-blue-600 text-white p-4">
//               <div className="max-w-4xl mx-auto flex justify-between items-center">
//                 <h1 className="text-xl font-bold">DevConnect 🚀</h1>
//                 <nav>
//                   <a href="/" className="mr-4 hover:underline">Home</a>
//                   <a href="/profile" className="mr-4 hover:underline">Profile</a>
//                   <a href="/posts" className="hover:underline">Posts</a>
//                 </nav>
//               </div>
//             </header>

//             {/* Main Content */}
//             <main className="flex-grow container mx-auto p-6">{children}</main>

//             {/* Footer */}
//             <footer className="bg-gray-800 text-white p-4 text-center">
//               <p>© 2025 DevConnect | Built with ❤️ using Next.js & Tailwind</p>
//             </footer>
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/component/Navbar"; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />  {/* Add Navbar here */}
            <main className="flex-grow container mx-auto p-6">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>© 2025 Next Project | Built with ❤️ using Next.js & Tailwind</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
