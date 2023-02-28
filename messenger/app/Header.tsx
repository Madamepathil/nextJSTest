import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const session = true;

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white p-5 flex justify-between items-center shadow-sm px-12">
        <div className="flex space-x-2 items-center">
          <Image
            src={"https://links.papareact.com/jne"}
            alt="Logo"
            height={10}
            width={50}
          />
          <div>
            <p className="text-blue-300">logged in as:</p>
            <p className="font-bold text-lg">Alexander Lindberg</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white p-5 flex justify-center items-center shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center gap-4 ">
          <Image
            src={"https://links.papareact.com/jne"}
            alt="Logo"
            height={10}
            width={50}
          />
          <p className="text-blue-500">Welcome to messenger</p>
        </div>

        <Link href={"/auth/signin"} className="py-3 px-6 bg-blue-400 rounded">
          SignIn
        </Link>
      </div>
    </header>
  );
};

export default Header;
