import useConversation from "@/zustand/useConversations";
import React, { useState } from "react";
import { useToast } from "./use-toast";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  async function sendMessage() {
    if (message.trim().length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      setMessages([...messages, data]);
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return { loading, sendMessage, setMessage, message };
}
