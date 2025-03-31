"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import ProductCard from "../components/productcard"

interface ChatMessageProps {
  chat: {
    id: string
    user: string
    bot: string
    rated?: "up" | "down" | null
  }
  onRate: (id: string, rating: "up" | "down") => void
}

const ChatMessage = ({ chat, onRate }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chat.bot)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleSpeakToggle = () => {
    if (!chat.bot || !("speechSynthesis" in window)) return

    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(chat.bot)
      utterance.lang = "en-US"
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.cancel()
      speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  const isBotResponded = chat.bot && !chat.bot.toLowerCase().includes("thinking")

  // 🔍 Custom product card rendering if bot sends special token
  const renderBotContent = () => {
    if (chat.bot === "__products__") {
      return (
        <div className="product-list">
          <ProductCard
            title="Smart Notebook"
            image="https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&w=400&q=80"
            description="Write and erase your notes digitally."
          />

          <ProductCard
            title="Headphones"
            image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80"
            description="Enjoy premium sound with comfort."
          />

          <ProductCard
            title="LED Desk Lamp"
            image="https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&w=400&q=80"
            description="Brighten up your workspace with style."
          />
        </div>
      )
    }

    // Default markdown rendering
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
            />
          ),
        }}
      >
        {chat.bot}
      </ReactMarkdown>
    )
  }

  return (
    <>
      <div className="message user-message">
        <p className="message-text">{chat.user}</p>
      </div>

      <div className="message bot-message">
        <div className="message-text">
          {chat.bot.toLowerCase().includes("thinking") ? (
            <div className="typing-animation">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          ) : (
            <>
              {renderBotContent()}

              {isBotResponded && (
                <div className="message-actions">
                  <div className="rating-buttons">
                    <span className="rating-text">Was this helpful?</span>
                    <button
                      className={`rating-button ${chat.rated === "up" ? "active" : ""}`}
                      onClick={() => onRate(chat.id, "up")}
                      disabled={chat.rated === "up"}
                      aria-label="Thumbs up"
                    >
                      <span className="material-symbols-rounded">thumb_up</span>
                    </button>
                    <button
                      className={`rating-button ${chat.rated === "down" ? "active" : ""}`}
                      onClick={() => onRate(chat.id, "down")}
                      disabled={chat.rated === "down"}
                      aria-label="Thumbs down"
                    >
                      <span className="material-symbols-rounded">thumb_down</span>
                    </button>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="icon-button"
                      onClick={handleCopy}
                      title="Copy response"
                    >
                      <span className="material-symbols-rounded">content_copy</span>
                    </button>
                    <button
                      className="icon-button"
                      onClick={handleSpeakToggle}
                      title="Speak this message"
                    >
                      <span className="material-symbols-rounded">
                        {isSpeaking ? "volume_off" : "volume_up"}
                      </span>
                    </button>
                  </div>

                  {copied && <span className="copied-popup">Copied!</span>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatMessage
