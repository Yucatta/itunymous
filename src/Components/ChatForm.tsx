"use client";
import React, { useState } from "react";
interface Props {
  onSendMessage: (e: string) => void;
}
const ChatForm = ({ onSendMessage }: Props) => {
  const [message, setmessage] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    if (message.trim() === "") {
      setmessage("");
    }
    console.log("submitted");
  }
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        onChange={(e) => setmessage(e.target.value)}
        className="flex-1 px-4 border-2 py-2 w-180 bg-neutral-700 rounded-lg foucs--outline-none"
      ></input>
      <button
        onClick={() => onSendMessage(message)}
        className="px-4 py-2 rounded-lg bg-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default ChatForm;
