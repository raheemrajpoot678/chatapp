import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversations";
import React from "react";

export default function Conversation({ conversation, lastInx }) {
  const {
    selectedConversation,
    setSelectedConversation,
    newMsgUsers,
    setNewMsgUsers,
  } = useConversation();

  const { onlineUsers } = useSocketContext();

  const isNewMsg = newMsgUsers?.includes(conversation?._id);

  const isSelected = selectedConversation?._id === conversation?._id;
  const isOnline = onlineUsers?.includes(conversation?._id);
  return (
    <div
      className={`relative flex items-center p-2 hover:bg-gray-200 cursor-pointer ${
        isSelected ? "bg-gray-200" : ""
      } ${!lastInx ? "border-b" : ""}`}
      onClick={() => {
        setSelectedConversation(conversation);
        setNewMsgUsers();
      }}
    >
      <div className="relative">
        <img
          src={conversation.profilePic}
          alt={conversation.fullName}
          className="w-10 h-10 rounded-full"
        />
        {isOnline && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1 ml-3">
        <div className="flex justify-between">
          <span className="font-medium">{conversation.fullName}</span>
          <span className="text-sm text-gray-500">{conversation.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {isOnline ? "Online" : "Offline"}
          </span>
          {isNewMsg && (
            <div className="text-[10px] bg-gray-500 text-white h-4 w-4 rounded-full flex items-center justify-center">
              <p>1</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
