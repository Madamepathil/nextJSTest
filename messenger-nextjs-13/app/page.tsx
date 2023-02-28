import React from "react";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./providers";
import { getServerSession } from "next-auth/next";

const page = async () => {
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`);
  const result = await data.json();
  const messages: Message[] = result.messages;
  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        {/* message list */}
        <MessageList initialMessages={messages} />
        {/* chat input */}

        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default page;
