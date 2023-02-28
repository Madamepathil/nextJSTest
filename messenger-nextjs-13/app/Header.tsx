import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth/next";
const Header = async () => {
  const session = await getServerSession();

  console.log(session, "----->");
  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-md">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            height={10}
            width={50}
            src={session?.user?.image!}
            alt="profile picture"
          />
          <div>
            <p className="text-blue-400">Logged in as</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-md">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-3">
          <Image
            src={"https://links.papareact.com/jne"}
            alt="logo"
            height={30}
            width={30}
          />
          <p className="text-blue-400">welcome to metamessenger</p>
        </div>
        <Link
          href={"/auth/signin"}
          className="transition duration-1000 ease-in-out py-2 px-4 bg-blue-400 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
