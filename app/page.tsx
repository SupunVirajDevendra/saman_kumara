"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Chatboticon from "@/components/chatboticon";
import ChatForm from "@/components/chatform";
import ChatMessage from "@/components/chatmessage";
import QuickResponse from "@/components/quick-response";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { id: string; user: string; bot: string; rated?: "up" | "down" | null }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  const generateBotResponse = async (
    fullChatHistory: { user: string; bot: string }[]
  ): Promise<string> => {
    setIsTyping(true);
    const latestUserMessage = fullChatHistory[fullChatHistory.length - 1].user;

    if (latestUserMessage === "Show me your products") {
      setIsTyping(false);
      return "__products__";
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_AI_MODEL || "openchat/openchat-7b",
          messages: [
            ...fullChatHistory.flatMap((msg) => [
              { role: "user", content: msg.user },
              { role: "assistant", content: msg.bot },
            ]),
            { role: "user", content: latestUserMessage },
          ],
        }),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;

      return reply || "⚠️ Bot gave an empty response. (No content returned)";
    } catch (err) {
      console.error("API error:", err);
      return "⚠️ Failed to reach API. Please try again later.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickResponse = (question: string) => {
    if (isTyping) return;
    const newId = uuidv4();

    setChatHistory((prev) => [
      ...prev,
      { id: newId, user: question, bot: "Thinking ..." },
    ]);

    setTimeout(() => {
      generateBotResponse([...chatHistory, { user: question, bot: "Thinking ..." }]).then(
        (response) => {
          setChatHistory((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((m) => m.id === newId);
            if (index !== -1) {
              updated[index].bot = response;
            }
            return updated;
          });
        }
      );
    }, 1000);
  };

  const handleRateResponse = (id: string, rating: "up" | "down") => {
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, rated: rating } : chat))
    );
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={toggleChatbot} id="chatbot-toggler" className="transition-transform duration-300 hover:scale-105">
        <span className="material-symbols-rounded">chat</span>
      </button>

      {showChatbot && (
        <div className="chatbot-popup">
          {/* Header always visible */}
          <div className="chatbot-header">
            <div className="header-info">
              <Chatboticon />
              <div className="header-text">
                <p className="status-text">We typically reply in a few minutes.</p>
                <h2 className="logo-text">Lia</h2>
              </div>
            </div>
            <button className="material-symbols-rounded transition-transform duration-300 hover:rotate-180" onClick={toggleChatbot}>
              expand_more
            </button>
          </div>

          {!emailSubmitted ? (
            <form className="login-form" onSubmit={handleEmailSubmit}>
              <h3>Lia is Here 💬</h3>
              <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                Enter your email to start the conversation
              </p>
              <input
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="btn-login transition-all duration-300 hover:shadow-lg">
                Start Chat
              </button>
              <p className="footer-note">Powered by ❤️ with <strong>Helaart</strong></p>
            </form>
          ) : (
            <>
              <div className="chat-body" ref={chatBodyRef}>
                <div className="message bot-message">
                  <div className="message-text">
                    <p>Hello! How can I assist you today?</p>
                    <div className="quick-responses">
                      <p className="quick-label">🛍️ Our Products</p>
                      <QuickResponse
                        text="🛒 View Products"
                        onClick={() => handleQuickResponse("Show me your products")}
                      />
                    </div>
                  </div>
                </div>

                {chatHistory.map((chat) => (
                  <ChatMessage
                    key={chat.id}
                    chat={chat}
                    onRate={handleRateResponse}
                  />
                ))}
              </div>

              <div className="chatbot-footer">
                <ChatForm
                  chatHistory={chatHistory}
                  setChatHistory={setChatHistory}
                  generateBotResponse={generateBotResponse}
                  setIsTyping={setIsTyping}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
