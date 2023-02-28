"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { NewChat } from "./NewChat";
import LoggedInUser from "./LoggedInUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { ChatRow } from "./ChatRow";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  console.log(chats);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <LoggedInUser />
          {/*  newChat*/}
          <NewChat />
          <div>{/* model selection */}</div>

          {/* map thro chat rows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        <img
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          src={session.user?.image!}
          alt=""
        />
      )}
    </div>
  );
};

export default SideBar;
