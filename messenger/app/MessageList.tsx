"use client";
import React from "react";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

const MessageList = () => {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log(messages);
  return (
    <div>
      {messages?.map((message) => {
        return <MessageComponent key={message.id} message={message} />;
      })}
    </div>
  );
};

export default MessageList;
