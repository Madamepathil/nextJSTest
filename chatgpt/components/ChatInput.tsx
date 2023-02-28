"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { db } from "../firebase";
import { Message } from "../typings";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  chatId: string;
}
const ChatInput = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  //use SWR to get model
  const model = "text-davinci-300";

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image!,
      },
    };
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toster notification to say loading
    const notify = toast.loading("chatGPT is thinking");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //Toast notification to say succesful!
      toast.success("chatGPT has responded", {
        id: notify,
      });
    });
  };

  return (
    <div className="bg-gray-700 text-gray-400 rounded-lg text-sm ">
      <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
        <input
          className="outline-none border-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="type your message here.."
          disabled={!session}
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300"
        >
          <PaperAirplaneIcon className="h-6 w-6 -rotate-45" />
        </button>
      </form>
      <div>{/* modelSelection */}</div>
    </div>
  );
};

export default ChatInput;
