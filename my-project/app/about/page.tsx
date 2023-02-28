"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    signIn();
  }
  return <div>page</div>;
};

export default page;
