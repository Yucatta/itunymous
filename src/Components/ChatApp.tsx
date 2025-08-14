"use client";
import ChatForm from "@/Components/ChatForm";
import ChatMessage from "@/Components/ChatMessage";
import { socket } from "@/lib/soocketClient";
import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import Header from "./Header";

export default function ChatApp() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [data, ...prev]);
    });
    socket.on("user_joined", (message) => {
      setMessages((prev) => [{ sender: "system", message }, ...prev]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);
  // useEffect(() => {
  //   const room = 123;
  //   const username = "123";
  //   socket.emit("join-room", { room, username: username });
  //   setJoined(true);
  // }, []);
  function handleJoin() {
    if (username && room) {
      socket.emit("join-room", { room, username: username });
      setJoined(true);
    }
  }
  function handleSendMessage(message: string) {
    const data = { room, message, sender: username };
    console.log(data);
    setMessages((prev) => [{ sender: username, message }, ...prev]);
    socket.emit("message", data);
  }
  return (
    <div className="flex flex-col justify-center  items-center">
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
        <MessageList
          username={username}
          messages={messages}
          onSendMessage={handleSendMessage}
        ></MessageList>
      )}{" "}
    </div>
  );
}
