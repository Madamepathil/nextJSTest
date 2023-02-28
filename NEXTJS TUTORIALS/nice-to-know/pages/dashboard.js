import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

const dashboard = () => {
  const { data: session, status } = useSession();
  /*   console.log(session);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []); */

  if (status === "loading") {
    return <p>loading...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied...</p>;
  }

  return <div>dashboard - you can biew this because youre signed in</div>;
};

export default dashboard;
