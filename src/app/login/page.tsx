'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual authentication logic here
    console.log(isLogin ? 'Logging in...' : 'Registering...', formData);
    router.push('/pr-tracker');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          {isLogin ? 'Login to PR Tracker' : 'Create New Account'}
        </h1>
        
        <div className="bg-gradient-to-br from-purple-600/90 to-purple-800/90 p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-2 rounded bg-black/20 border border-white/10 focus:outline-none focus:border-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-2 rounded bg-black/20 border border-white/10 focus:outline-none focus:border-purple-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Register here" 
                : 'Already have an account? Login here'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}