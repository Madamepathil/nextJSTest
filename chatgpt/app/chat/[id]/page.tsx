import React from "react";
import { Chat } from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
interface Props {
  params: {
    id: string;
  };
}
const ChatPage = ({ params: { id } }: Props) => {
  console.log(id);
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
