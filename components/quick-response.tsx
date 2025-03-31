"use client"

import type React from "react"

interface QuickResponseProps {
  text: string
  onClick: () => void
}

const QuickResponse: React.FC<QuickResponseProps> = ({ text, onClick }) => {
  return (
    <button
      className="quick-response-button"
      onClick={onClick}
      aria-label={`Quick reply: ${text}`}
    >
      {text}
    </button>
  )
}

export default QuickResponse
