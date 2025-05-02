"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, redirectTo, router]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Panel */}
      <div className="bg-black text-white flex flex-col justify-center items-center p-10 relative">
        
        <img
          src="/logo.jpeg" // Replace with your actual image path
          alt="Illustration"
          className="w-full"
        />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-3xl font-semibold mb-4">Sign In</h2>
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center w-72 bg-white border border-gray-300 rounded-md px-4 py-3 mb-4 shadow hover:shadow-md transition"
        >
          <FcGoogle className="text-2xl mr-2" />
          <span>Sign in with Google</span>
        </button>
        <div className="mb-4 text-gray-500">OR</div>
        <input
          type="email"
          placeholder="Email"
          className="w-72 px-4 py-3 mb-4 border rounded-md bg-gray-100 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-72 px-4 py-3 mb-4 border rounded-md bg-gray-100 focus:outline-none"
        />
        <button className="w-72 bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900">
          LOGIN
        </button>
      </div>
    </div>
  );
}
