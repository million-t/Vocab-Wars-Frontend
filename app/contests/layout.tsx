"use client";
import { login } from "@/services/authService";
import { useState } from "react";

export default function ArenaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex hidden gap-4 w-full  justify-end items-center">
        <div className="">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label> */}
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full max-w-[240px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label> */}
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full max-w-[240px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        
        <button
        onClick={handleLogin}
        className="m-2 rounded p-2 bg-slate-800 text-gray-100">
          Login
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
