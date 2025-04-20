// app/page.js
"use client";

import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail, logout } = useAuth();

  return (
    <div className="p-6">
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={loginWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign in with Google
          </button>

          <button
            onClick={() => loginWithEmail("test@example.com", "password123")}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Login with Email
          </button>

          <button
            onClick={() => registerWithEmail("test@example.com", "password123")}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
          >
            Register with Email
          </button>
        </>
      )}
    </div>
  );
}
