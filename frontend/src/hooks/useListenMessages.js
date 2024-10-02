import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversations";
import React, { useEffect } from "react";

export default function useListenMessages() {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages, messages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      if (message.senderId === selectedConversation._id) {
        setMessages([...messages, message]);
      }
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages, socket]);
}
