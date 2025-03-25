"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material"; 
import {  useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter(); // Initialize router
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          router.push("/login"); // Redirect to login page after success
        }, 2000); // Optional: delay for better UX
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      console.log(error)
      setError("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[url('/login.jpg')] bg-cover min-h-screen">
      {/* Background Image */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-gray-100 shadow-lg rounded-lg space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Sign Up Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <TextField
                id="username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <TextField
                id="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                // label="Email Address"
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <TextField
                id="phone"
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
               
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <TextField
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                value={formData.password}
              
                variant="outlined"
                fullWidth
                size="small"
                required
              />
            </div>

            {/* Submit Button */}
            <a href="/login" className="font-medium text-blue-600 hover:underline">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            </a>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-500 text-center">{message}</p>}
          </form>

          {/* Footer Links */}
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Already have an account?
              <a href="/login" className="font-medium text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
