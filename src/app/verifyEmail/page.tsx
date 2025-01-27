"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Check, X, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserMail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserMail();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <Mail className="mx-auto h-16 w-16 text-blue-500 mb-6" />

        {loading ? (
          <div className="animate-pulse">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Verifying Email
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your email address...
            </p>
          </div>
        ) : verified ? (
          <div>
            <Check className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Email Verified Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been confirmed. You can now access all features.
            </p>
            <Link
              href="/login"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent 
                         rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <div>
            <X className="mx-auto h-16 w-16 text-red-500 mb-6" />
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Verification Error
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. The link may be invalid or expired.
            </p>
            <Link
              href="/resend-verification"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent 
                         rounded-md shadow-sm text-sm font-medium text-white bg-red-600 
                         hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Resend Verification Email
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
