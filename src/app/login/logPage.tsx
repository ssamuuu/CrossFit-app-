"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-200 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link 
            href="/register" 
            className="text-blue-400 hover:text-blue-300"
          >
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}