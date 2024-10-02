import useGetMessages from "@/hooks/useGetMessages";
import useSendMessage from "@/hooks/useSendMessage";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SkeletonCom from "./Skeleton";

const Chat = ({ selectedContact }) => {
  const { loading: load, messages } = useGetMessages();
  const { loading, sendMessage, setMessage, message } = useSendMessage();
  const lastMsgRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  if (load) return <SkeletonCom />;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">{selectedContact.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div ref={lastMsgRef} key={index}>
            <Message msg={msg} />
          </div>
        ))}
      </div>
      <div className="p-4">
        <form className="flex" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-lg p-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-r-lg px-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
