import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const blog = ({ data }) => {
  return <div>{data}</div>;
};

export default blog;

//secure page serverside
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin/callbackUrl=http://localhost:3000/blog`,
        permanent: false,
      },
    };
  }
  console.log(session);
  return {
    props: {
      data: session ? "private" : "free",
    },
  };
};
