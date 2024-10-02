import React, { useEffect, useState } from "react";
import { useToast } from "./use-toast";
import useConversation from "@/zustand/useConversations";

export default function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const { toast } = useToast();

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        toast({
          title: "Fail",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);
  return { loading, messages };
}
