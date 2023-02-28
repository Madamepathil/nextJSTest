import { useSession, signIn } from "next-auth/react";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const page = async () => {
  /*  const session = await getServerSession();
  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  } */
  /*  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    console.log("ösösö");
    signIn();
  } */
  return <div>page</div>;
};

export default page;
