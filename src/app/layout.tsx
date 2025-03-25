import { AuthProvider } from "@/context/Authcontext";
import Navbar from "@/component/Navbar";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">{children}</main>
            <footer className="bg-gray-800 text-white p-6 text-center flex flex-col md:flex-row justify-evenly items-center space-y-4 md:space-y-0">
              <p>
                Name: <span className="font-semibold">Karan Kumar</span>
              </p>
              <p>
                GitHub Repository:
                <Link href="https://github.com/Karankumar790/Next_Project">
                  <span className="text-blue-400 hover:text-blue-500 cursor-pointer">
                    Karankumar-Next_Project
                  </span>
                </Link>
              </p>


              <p>
                GitHub link:{" "}
                <Link href="https://github.com/Karankumar790/">
                  <span className="text-blue-400 hover:text-blue-500 cursor-pointer">
                    Karankumar@github
                  </span>
                </Link>
              </p>

              <p>
                LinkedIn:{" "}
                <Link href="https://www.linkedin.com/in/karan-kumar-9ba34b27b">
                  <span className="text-blue-400 hover:text-blue-500 cursor-pointer">
                    karan-kumar@linkedin
                  </span>
                </Link>
              </p>
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
          theme="light"
          aria-label={undefined}
        />
      </body>
    </html>
  );
}
