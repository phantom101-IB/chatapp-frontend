import React from "react";
import { useChatStore } from "../stores/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const local = "http://localhost:3000";
  const cloud = "https://chatapp-backend-v5jc.onrender.com";
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="rounded-full size-10 relative">
              <img
                src={
                  selectedUser?.profilePic
                    ? `${cloud}/api/v1/profile/${selectedUser.profilePic}`
                    : null || "/avatar.png"
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User INfor */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
