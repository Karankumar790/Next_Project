import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/component/Navbar"; 
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />  {/* Navbar */}
            <main className="flex-grow container mx-auto p-6">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>© 2025 Next Project | Built with ❤️ using Next.js & Tailwind</p>
            </footer>
          </div>
        </AuthProvider>

        {/* Toast Notification Container */}
        <ToastContainer  
          // position="cen"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" aria-label={undefined}        
          />
      </body>
    </html>
  );
}
