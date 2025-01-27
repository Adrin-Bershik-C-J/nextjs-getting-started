"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Profile Page
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome to your profile!
        </p>
        <h2
          className={`p-3 mb-4 rounded-md text-center text-white ${
            data === "nothing" ? "bg-red-400" : "bg-green-500"
          }`}
        >
          {data === "nothing" ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 4.418-3.582 8-8 8a8 8 0 110-16c4.418 0 8 3.582 8 8zm-8-4a.75.75 0 00-.75.75V10H7.25a.75.75 0 000 1.5H9.25v3.75a.75.75 0 001.5 0V11.5h2.25a.75.75 0 000-1.5H10.75V6.75A.75.75 0 0010 6z"
                  clipRule="evenodd"
                />
              </svg>
              Nothing Found
            </span>
          ) : (
            <Link
              href={`/profile/${data}`}
              className="underline hover:no-underline transition-all duration-200"
            >
              View Profile ({data})
            </Link>
          )}
        </h2>

        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
