"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  // TODO: 4 states — token, password, confirmPassword, message (all start as "")
const [token, setToken] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");



  // TODO: useEffect that reads the token from the URL (copy from verifyemail)

   useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, []);

  const onReset = async () => {
    // TODO: if password !== confirmPassword → setMessage("Passwords do not match") and return
if (password !== confirmPassword) {
  setMessage("Passwords do not match");
  return;
}
    try {
      // TODO: axios.post to your reset API, sending { token, password }
      await axios.post("/api/users/resetpassword", { token, password });
      // TODO: router.push("/login")
            router.push("/login");

    } catch (error: any) {
      // TODO: setMessage(...)  — same as forgot password page
            setMessage(error.response?.data?.error || "Something went wrong");

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Password</h1>
      <hr />
      <label htmlFor="password">password</label>

      {/* TODO: input for password (type="password") */}
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 bg-white text-black"
        id="password"
        type="password"
        value={password}
        placeholder="password"   
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* TODO: input for confirmPassword (type="password") */}
       <label htmlFor="confirmPassword">confirm password</label>

  <input
        className="p-2 border border-gray-300 rounded-lg mb-4 bg-white text-black"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        placeholder="confirm password"
     
        onChange={(e) => setConfirmPassword(e.target.value)}
      />


      {/* TODO: button → onReset */}
  <button onClick={onReset} className="p-2 border border-gray-300 rounded-lg mb-4">
        Reset password
      </button>
      {/* TODO: show message if not empty */}

      {message && <p>{message}</p>}


    

      <Link href="/login">Back to login</Link>
    </div>
  );
}