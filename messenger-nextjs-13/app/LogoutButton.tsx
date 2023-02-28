"use client";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="transition duration-1000 ease-in-out py-2 px-4 bg-blue-400 rounded"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
