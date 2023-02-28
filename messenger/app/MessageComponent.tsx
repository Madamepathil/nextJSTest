import Image from "next/image";
import React from "react";
import { Message } from "../typings";

interface Props {
  message: Message;
}

const MessageComponent = ({ message }: Props) => {
  return (
    <div>
      <div>
        <Image
          src={message.profilePic}
          alt="profilePic"
          height={10}
          width={50}
          className="rounded-full"
        />
      </div>
      <div>
        <p>{message.username}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
