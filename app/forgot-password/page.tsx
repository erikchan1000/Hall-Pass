'use client'
import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase_config.js";
import {useRouter} from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null as any)
  const router = useRouter();

  const handleReset = async (e: any) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus("success")
      alert("Reset Email Sent");
    }
    catch (error: any) {
      console.log(error)
      setResetStatus("error")
      alert(error.message);
    }
  }
  
  useEffect(() => {
    if (resetStatus === "success") {
      router.push("/seller-login")
    }
  }
  , [resetStatus, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
        <form onSubmit={handleReset}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            sx={{
              marginBottom: "20px",
              width: "100%"
            }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
