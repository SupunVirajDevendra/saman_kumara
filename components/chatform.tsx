"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

// Dynamically import emoji picker for Next.js compatibility
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const THINKING_DELAY = 1000;

interface Chat {
  id: string;
  user: string;
  bot: string;
  rated?: "up" | "down" | null;
}

interface ChatFormProps {
  chatHistory: Chat[];
  setChatHistory: React.Dispatch<React.SetStateAction<Chat[]>>;
  generateBotResponse: (chatHistory: { user: string; bot: string }[]) => Promise<string>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  setIsTyping,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    const chatBody = document.getElementById("chatBody");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userMessage = inputRef.current?.value?.trim();
    if (!userMessage || !inputRef.current || isSubmitting) return;

    const messageId = uuidv4();
    setIsSubmitting(true);
    setIsTyping(true);
    inputRef.current.value = "";

    setChatHistory((prev) => [
      ...prev,
      { id: messageId, user: userMessage, bot: "Thinking ..." },
    ]);

    setTimeout(scrollToBottom, 100);

    try {
      await new Promise((resolve) => setTimeout(resolve, THINKING_DELAY));

      const simpleChatHistory = chatHistory.map(({ user, bot }) => ({ user, bot }));

      const botResponse = await generateBotResponse([
        ...simpleChatHistory,
        { user: userMessage, bot: "Thinking ..." },
      ]);

      setChatHistory((prev) => {
        const updated = [...prev];
        const lastIndex = updated.findIndex((msg) => msg.id === messageId);
        if (updated[lastIndex]) {
          updated[lastIndex].bot = botResponse;
        }
        setTimeout(scrollToBottom, 100);
        return updated;
      });
    } catch (error) {
      setChatHistory((prev) => {
        const updated = [...prev];
        const lastIndex = updated.findIndex((msg) => msg.id === messageId);
        if (updated[lastIndex]) {
          updated[lastIndex].bot = "⚠️ Sorry, something went wrong.";
        }
        setTimeout(scrollToBottom, 100);
        return updated;
      });
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    if (inputRef.current) {
      inputRef.current.value += emojiData.emoji;
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage = `📎 Attached file: ${file.name}`;
      const messageId = uuidv4();
      setChatHistory((prev) => [
        ...prev,
        { id: messageId, user: fileMessage, bot: "Thinking ..." },
      ]);

      setTimeout(() => {
        generateBotResponse([
          ...chatHistory,
          { user: fileMessage, bot: "Thinking ..." },
        ]).then((response) => {
          setChatHistory((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((m) => m.id === messageId);
            if (index !== -1) {
              updated[index].bot = response;
            }
            return updated;
          });
        });
      }, 1000);
    }
  };

  return (
    <>
      <form className="chat-form" onSubmit={handleFormSubmit} aria-label="Chat message form">
        <div className="form-tools">
          {/* Attach file */}
          <button
            type="button"
            className="tool-button"
            onClick={handleFileClick}
            aria-label="Attach file"
          >
            <span className="material-symbols-rounded">attach_file</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Emoji button */}
          <button
            type="button"
            className="tool-button"
            onClick={() => setShowEmojiPicker(true)}
            aria-label="Insert emoji"
          >
            <span className="material-symbols-rounded">mood</span>
          </button>
        </div>

        {isMounted && (
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your message..."
            className="message-input"
            required
            disabled={isSubmitting}
            aria-label="Message input"
          />
        )}

        <button
          type="submit"
          className="send-button"
          disabled={isSubmitting}
          aria-label="Send message"
        >
          <span className="material-symbols-rounded">send</span>
        </button>
      </form>

      {/* Centered Emoji Picker with Close Button */}
      {showEmojiPicker && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowEmojiPicker(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                marginBottom: "5px",
              }}
            >
              ❌
            </button>
          </div>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </>
  );
};

export default ChatForm;
