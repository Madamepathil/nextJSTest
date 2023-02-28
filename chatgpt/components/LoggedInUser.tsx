"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoggedInUser = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-between items-center pb-5 space-y-3">
      <p className=" text-white ">Welcome {session?.user?.name}</p>

      <button
        onClick={() => signOut()}
        className="bg-slate-400 px-4 py-1 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default LoggedInUser;
