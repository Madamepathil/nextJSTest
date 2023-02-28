"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { Message } from "../typings";

type Props = {
  message: Message;
};

const MessageComponent = ({ message }: Props) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message.profilePic}
          alt="pic"
          height={10}
          width={50}
          className="rounded-full mx-2 my-2"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end group">
          <div
            onMouseEnter={() => setShowDate(true)}
            onMouseLeave={() => setShowDate(false)}
            className={`px-3 py-2 rounded-lg w-fit text-red  cursor-pointer ${
              isUser ? "bg-blue-400 ml-auto order-2" : " bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`px-2 text-sm opacity-0   transition-all ease-out duration-1000 group-hover:opacity-100 ${
              isUser && "text-right"
            }`}
          >
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
