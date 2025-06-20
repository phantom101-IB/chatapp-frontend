import { MessageSquareText } from "lucide-react";
import React from "react";

function NoChatSelected() {
  return (
    <div className="w-full flex items-center justify-center p-16 bg-base-100/40 flex-1">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-4 gap-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquareText className="size-8 text-primary" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
          <p className="text-base-content/60">
            Select a chat from the sidebar to get Chatty
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoChatSelected;
