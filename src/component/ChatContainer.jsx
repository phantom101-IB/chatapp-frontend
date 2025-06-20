import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useChatStore } from "../stores/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatTime } from "../lib/utils";
import { useAuthStore } from "../stores/useAuthStore";

function ChatContainer() {
  const {
    selectedUser,
    messages,
    subscribeToMessage,
    getMessages,
    isMessagesLoading,
    unsubscribeMessage,
  } = useChatStore();
  const messageRef = useRef(null);
  const { authUser } = useAuthStore();
  const local = "http://localhost:3000";
  const cloud = "https://chatapp-backend-v5jc.onrender.com";
  const imgUrl = `${cloud}/api/v1/profile`;

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessage();

    return () => unsubscribeMessage();
  }, [selectedUser._id, getMessages, subscribeToMessage, unsubscribeMessage]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => {
          return (
            <div
              key={i}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full broder">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? `${imgUrl}/${authUser.profilePic}` || "/avatar.png"
                        : `${imgUrl}/${selectedUser.profilePic}` || "/avatar"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.picture && (
                  <img
                    src={`${imgUrl}/${message.picture}`}
                    alt="attachment"
                    className="sm-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
