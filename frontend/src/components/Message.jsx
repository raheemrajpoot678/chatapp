import { useAuthContext } from "@/context/AuthContext";
import { dateFormat } from "@/helper/dateFormater";
import useListenMessages from "@/hooks/useListenMessages";
import React from "react";

export default function Message({ msg }) {
  const { authUser } = useAuthContext();
  const isMe = authUser?._id === msg.senderId;
  useListenMessages();

  return (
    <div className={`my-2 ${isMe ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block p-2 rounded-lg ${
          isMe ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {msg.message}
      </div>
      <div className="text-xs text-gray-500">{dateFormat(msg.createdAt)}</div>
    </div>
  );
}
