import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "../stores/useChatStore";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an Image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = new FormData(e.target);

    sendMessage(messageData);
    setText("");
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="imagePreview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              type="button"
              onClick={removeImagePreview}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            style={{ outline: "none" }}
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            name="image"
            onChange={handleImagePreview}
            className="hidden"
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            } `}
            onClick={() => imageInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="btn btn-sm btn-circle"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
