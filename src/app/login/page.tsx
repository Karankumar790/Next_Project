"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login Successful!");
        toast.success(`${data.user?.username || "User"}! Login Successful! 🎉`);
        router.push("/dashboard");
      } else {
        toast.error(data.error || "An unknown error occurred"); // Error toast
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      toast.error("An error occurred while logging in."); // Network error toast
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/login.jpg')] bg-cover min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-gray-100 shadow-lg rounded-lg space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-600">Sign in first, then enter to login</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <TextField
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <TextField
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700 flex justify-center items-end w-25 h-13"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                />
                <span className="ml-2">Remember Me</span>
              </label>
              <a href="/forget" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-500 text-center">{message}</p>}
          </form>

          <div className="text-center">
            <p className="text-lg text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="font-medium text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
