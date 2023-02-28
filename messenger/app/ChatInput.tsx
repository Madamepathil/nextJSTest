"use client";
import React from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

const ChatInput = () => {
  const [inputValue, setInputValue] = React.useState("");

  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    setInputValue("");
    const id = uuid();

    const message: Message = {
      id,
      message: inputValue,
      created_at: Date.now(),
      username: "alexander lindberg",
      profilePic:
        "https://scontent.farn2-2.fna.fbcdn.net/v/t1.18169-9/10982404_668007850011671_7081501083414937668_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bD1BZQxk0psAX-l4DJf&_nc_ht=scontent.farn2-2.fna&oh=00_AfDA735NCt5NGSfqnbJ_ZvSo61fEXI22HP-aNHTONSUqVQ&oe=63FF3B0E",
      email: "alexander.lindberg@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 "
    >
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="enter message.."
        className="flex-1 rounded outline-none border-none focus:ring-1 focus:ring-blue-600"
      />
      <button
        disabled={!inputValue}
        type="submit"
        className="py-4 px-10 bg-blue-400 rounded text-white disabled:opacity-30"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
