"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "./userCard";
const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {/* is !user = signin btn */}
        <button onClick={() => signOut()}> sign Out</button>
        {/* pass session info to server component */}
        <UserCard user={session.user} />
      </>
    );
  }
  return (
    <div>
      {/* is user = signoout btn */}
      <button onClick={() => signIn()}> sign in</button>
    </div>
  );
};

export default Login;
