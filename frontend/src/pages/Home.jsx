import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjust the path as necessary
import Chat from "../components/Chat"; // Adjust the path as necessary
import useConversation from "@/zustand/useConversations";

const Home = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <Sidebar />
      <div className="flex-1 p-4">
        {selectedConversation ? (
          <Chat selectedContact={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
