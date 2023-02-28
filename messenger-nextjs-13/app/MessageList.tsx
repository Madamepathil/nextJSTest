"use client";
import React, { useEffect } from "react";
import fetcher from "../utils/fetchMessages";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import MessageComponent from "./MessageComponent";
import { Message } from "../typings";
interface Props {
  initialMessages: Message[];
}

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      console.log("new mwssafwe from pusher---->", data.message);

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto ">
      {(messages || initialMessages)?.map((item) => (
        <MessageComponent key={item.id} message={item} />
      ))}
    </div>
  );
};

export default MessageList;
