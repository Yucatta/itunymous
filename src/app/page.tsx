"use client";
import ChatForm from "@/Components/ChatForm";
import ChatMessage from "@/Components/ChatMessage";
import { socket } from "@/lib/soocketClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("user_joined", (message) => {
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  function handleJoin() {
    if (username && room) {
      socket.emit("join-room", { room, username: username });
      setJoined(true);
    }
  }
  function handleSendMessage(message: string) {
    const data = { room, message, sender: username };
    console.log(data);
    setMessages((prev) => [...prev, { sender: username, message }]);
    socket.emit("message", data);
  }
  return (
    <div className="flex flex-col mt-20 justify-center w-full h-full items-center">
      <div className="flex bold text-2xl">Room:1</div>
      {!joined ? (
        <div className="flex flex-col justify-center gap-y-5 items-center">
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="name"
            className="flex-1 px-4 border-2 py-2 w-100 bg-neutral-700 rounded-lg foucs--outline-none"
          ></input>
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="room"
            className="flex-1 px-4 border-2 py-2 w-100 bg-neutral-700 rounded-lg foucs--outline-none"
          ></input>
          <button
            onClick={handleJoin}
            className="px-4 py-2 rounded-lg bg-blue-500 cursor-pointer"
          >
            Send
          </button>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col  h-155 mt-20 w-200 bg-neutral-700 justify-start">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.message}
                sender={msg.sender}
                isOwnMessage={username === msg.sender}
              ></ChatMessage>
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage}></ChatForm>
        </>
      )}{" "}
    </div>
  );
}
