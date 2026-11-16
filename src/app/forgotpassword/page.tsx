"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  // TODO: a state for the email (login uses an object with email + password —
  //       here you only need ONE string)
const [email, setEmail] = useState("");


  // TODO: a state for a message to show the user (start it as "")
const [message, setMessage] = useState("");

  const onSubmit = async () => {
    try {
      // TODO: axios.post to your new API route, sending { email }
await axios.post("/api/users/forgotpassword", { email });

      // TODO: set the message to something like "Check your email"
setMessage("Check your email for a reset link.");
    } catch (error: any) {
      // TODO: set the message to the error from the server
      //       (hint: error.response?.data?.error)
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Forgot Password</h1>
      <hr />

      {/* TODO: label + input for email (copy from login, then fix value/onChange) */}
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 bg-white text-black"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value )}
        placeholder="email"
      />
      

      {/* TODO: button that calls onSubmit */}
      <button onClick={onSubmit} className="p-2 border border-gray-300 rounded-lg mb-4">
        Send reset link
      </button>
      

      {/* TODO: show the message, but only if it isn't empty */}
              {message && <p>{message}</p>}

      

      <Link href="/login">Back to login</Link>
    </div>
  );
}