'use client'

import React, { useState, useEffect } from 'react';
import { auth } from "@/firebase/firebase_config.js";
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/seller")
      }
    })
  }, [])

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/seller")
    }
    catch (error: any) {
      console.log(error)
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Seller Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
      <span className="text-center mt-5 block text-xs">
        Register for a new account <Link href="/register" className="text-blue-500">here</Link>
      </span>
      <span className="text-center mt-5 block text-xs">
        Forgot your password? <Link href="/forgot-password" className="text-blue-500">Reset it here</Link>
      </span>
      </div>
    </div>
  );
}
