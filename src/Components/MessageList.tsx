import React, { Ref, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatForm from "./ChatForm";
interface Props {
  messages: { sender: string; message: string }[];
  username: string;
  onSendMessage: (e: string) => void;
}
const MessageList = ({ messages, username, onSendMessage }: Props) => {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const reversedMessages = messages.slice().reverse();

  function handleSendMessage(e: string) {
    onSendMessage(e);
  }
  useEffect(() => {
    messagesRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);
  return (
    <>
      {" "}
      <div className="flex  h-170 mt-10 w-200 px-7 overflow-y-scroll bg-neutral-400 rounded-xl ">
        <div
          style={{ height: reversedMessages.length * 48 }}
          className=" flex overflow-y-auto flex-col gap-1  w-200 mb-5 justify-end"
        >
          {reversedMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              sender={msg.sender}
              isOwnMessage={username === msg.sender}
            ></ChatMessage>
          ))}
          <div className="w-0 h-0" ref={messagesRef}></div>
        </div>
      </div>
      <div className=" bg-neutral-600 mt-5 flex shrink-0 items-center justify-center rounded-xl">
        <ChatForm onSendMessage={handleSendMessage}></ChatForm>
      </div>
    </>
  );
};

export default MessageList;
