"use client"

import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import Chatboticon from "@/components/chatboticon"
import ChatForm from "@/components/chatform"
import ChatMessage from "@/components/chatmessage"
import QuickResponse from "@/components/quick-response"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    { id: string; user: string; bot: string; rated?: "up" | "down" | null }[]
  >([])
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef<HTMLDivElement | null>(null)

  const toggleChatbot = () => setShowChatbot((prev) => !prev)

  const generateBotResponse = async (
    fullChatHistory: { user: string; bot: string }[]
  ): Promise<string> => {
    setIsTyping(true)
    const latestUserMessage = fullChatHistory[fullChatHistory.length - 1].user

    if (latestUserMessage === "Show me your products") {
      setIsTyping(false)
      return "__products__"
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: fullChatHistory
            .map((msg) => [
              { role: "user", parts: [{ text: msg.user }] },
              { role: "model", parts: [{ text: msg.bot }] },
            ])
            .flat()
            .slice(0, -1)
            .concat({
              role: "user",
              parts: [{ text: latestUserMessage }],
            }),
        }),
      })

      const data = await response.json()
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t understand that."
      )
    } catch (err) {
      return "⚠️ Failed to reach API. Please try again later."
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickResponse = (question: string) => {
    if (isTyping) return
    const newId = uuidv4()

    setChatHistory((prev) => [
      ...prev,
      { id: newId, user: question, bot: "Thinking ..." },
    ])

    setTimeout(() => {
      generateBotResponse([...chatHistory, { user: question, bot: "Thinking ..." }]).then(
        (response) => {
          setChatHistory((prev) => {
            const updated = [...prev]
            const index = updated.findIndex((m) => m.id === newId)
            if (index !== -1) {
              updated[index].bot = response
            }
            return updated
          })
        }
      )
    }, 1000)
  }

  const handleRateResponse = (id: string, rating: "up" | "down") => {
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, rated: rating } : chat))
    )
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [chatHistory, isTyping])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      loginForm.email === "demo@example.com" &&
      loginForm.password === "123456"
    ) {
      setIsLoggedIn(true)
      setShowLoginForm(false)
      setLoginError("")
    } else {
      setLoginError("Invalid email or password")
    }
  }

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={toggleChatbot} id="chatbot-toggler">
        <span className="material-symbols-rounded">chat</span>
      </button>

      {showChatbot && (
        <div className="chatbot-popup" style={{ position: "relative" }}>
          {!isLoggedIn && (
            <div className="login-overlay">
              {showLoginForm ? (
                <form className="login-form" onSubmit={handleLogin}>
                  <h3>🔐 Secure Login</h3>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                  {loginError && <p className="error-text">{loginError}</p>}
                  <button type="submit" className="btn-login">
                    Log In
                  </button>
                  <p className="demo-hint">Demo: demo@example.com / 123456</p>
                </form>
              ) : (
                <div className="login-cta">
                  <h3>🔒 Login Required</h3>
                  <p>Please log in to use the chatbot.</p>
                  <button onClick={() => setShowLoginForm(true)} className="btn-login">
                    Log in
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="chatbot-header">
            <div className="header-info">
              <Chatboticon />
              <div className="header-text">
                <p className="status-text">We typically reply in a few minutes.</p>
                <h2 className="logo-text">Saman Kumara</h2>
              </div>
            </div>
            <button className="material-symbols-rounded" onClick={toggleChatbot}>
              expand_more
            </button>
          </div>

          <div className="chat-body" id="chatBody" ref={chatBodyRef}>
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
                onRate={(id: string, rating: "up" | "down") =>
                  handleRateResponse(id, rating)
                }
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
        </div>
      )}
    </div>
  )
}
