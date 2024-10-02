import useGetConversation from "@/hooks/useGetConversation";
import React from "react";
import Conversation from "./Conversation";
import useConversation from "@/zustand/useConversations";

const Sidebar = () => {
  const { loading, conversations } = useGetConversation();
  const { newMsgUsers } = useConversation();
  console.log(newMsgUsers);
  return (
    <div className="w-64 border-r border-gray-300">
      <div className="p-4 border-b border-gray-400">
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>
      {loading ? (
        <div className="text-center mt-12 text-stone-700">Loading</div>
      ) : (
        <div className="p-2">
          {conversations?.map((conversation, index) => {
            return (
              <Conversation
                key={index}
                lastInx={index === conversations.length - 1}
                conversation={conversation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
