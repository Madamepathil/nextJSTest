import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

const homePage = () => {
  return (
    <div className="">
      {/* messageList */}
      <MessageList />
      {/* chatinput */}
      <ChatInput />
    </div>
  );
};

export default homePage;
