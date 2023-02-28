"use client";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { getServerSession } from "next-auth/next";

interface Props {
  session: Awaited<ReturnType<typeof getServerSession>>;
}
const ChatInput = ({ session }: Props) => {
  const [text, setText] = useState<string>("");

  const {
    data: messages,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    const messageToSend = text;
    setText("");
    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    //push to backend upstash redis

    const uploadMessageToUpstash = async () => {
      const response = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const dataResult = await response.json();
      //return [dataResult.message, ...messages!];
      mutate([dataResult.message, ...messages!], {
        optimisticData: [message, ...messages!],
        rollbackOnError: true,
      });
    };

    /*  await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
    }); */
    uploadMessageToUpstash();
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 w-full z-50 flex px-10 py-5 space-x-2 border-t border-gray-300 bg-white"
    >
      <input
        value={text}
        disabled={!session}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="flex-1 rounded border border-blue-400 px-5 py-3 outline-none "
        placeholder="enter message"
      />
      <button
        disabled={!text}
        className="transition duration-500 ease-in-out py-2 px-4 bg-blue-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        send
      </button>
    </form>
  );
};

export default ChatInput;
