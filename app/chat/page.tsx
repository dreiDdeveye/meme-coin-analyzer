"use client"

import { MainNav } from "@/components/main-nav"
import Aurora from "@/components/aurora"
import { MessageCircle, Send, Sparkles, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import {
  getOracleResponse,
  ConversationContext,
  OracleResponse,
  cryptoTermsExplanations,
  getRandomElement,
} from "@/lib/oracle-responses"

// Typing effect hook
function useTypingEffect(text: string, speed: number = 20, enabled: boolean = true) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      return
    }

    setIsTyping(true)
    setDisplayedText("")
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, enabled])

  return { displayedText, isTyping }
}

// Message component with typing effect
function OracleMessage({ 
  content, 
  mood, 
  isLatest 
}: { 
  content: string; 
  mood?: string; 
  isLatest: boolean 
}) {
  const { displayedText, isTyping } = useTypingEffect(content, 15, isLatest)
  
  const getMoodIndicator = () => {
    switch (mood) {
      case "mystical": return "🔮"
      case "warning": return "⚠️"
      case "bullish": return "🐂"
      case "bearish": return "🐻"
      case "cryptic": return "🌀"
      case "humorous": return "😏"
      case "philosophical": return "🧘"
      default: return "👁️"
    }
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-3 rounded-lg bg-card border border-border">
        <div className="flex items-start gap-2">
          <span className="text-lg">{getMoodIndicator()}</span>
          <p className="text-sm font-mono">
            {isLatest ? displayedText : content}
            {isTyping && <span className="animate-pulse">▊</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

// Suggested prompts component
function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  const prompts = [
    "How do I spot a rug pull?",
    "What's the current market sentiment?",
    "Tell me about Solana ecosystem",
    "What is impermanent loss?",
    "Give me trading wisdom",
    "What does WAGMI mean?",
  ]

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(prompt)}
          className="px-3 py-1.5 text-xs font-mono bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}

// Oracle character animation component
function OracleCharacter({ isThinking }: { isThinking: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow effect */}
      <div className={`absolute w-40 h-40 rounded-full bg-primary/20 blur-xl ${isThinking ? 'animate-pulse' : ''}`} />
      
      {/* Video container with border */}
      <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
        <video
          src="/oracleclip.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover ${isThinking ? 'brightness-125' : 'brightness-100'} transition-all duration-300`}
        />
        
        {/* Thinking overlay */}
        {isThinking && (
          <div className="absolute inset-0 bg-primary/10 animate-pulse" />
        )}
      </div>
      
      {/* Floating particles when thinking */}
      {isThinking && (
        <>
          <div className="absolute w-2 h-2 bg-primary rounded-full animate-ping" style={{ top: '5%', left: '15%' }} />
          <div className="absolute w-1 h-1 bg-primary rounded-full animate-ping" style={{ top: '85%', left: '25%', animationDelay: '0.5s' }} />
          <div className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-ping" style={{ top: '25%', right: '15%', animationDelay: '0.3s' }} />
        </>
      )}
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ 
    role: "user" | "oracle"; 
    content: string;
    mood?: string;
  }>>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    messageCount: 0,
    topicsDiscussed: [],
    lastTopic: null,
    mood: "neutral",
  })
  const [soundEnabled, setSoundEnabled] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    // Simulate thinking delay (variable based on message length)
    const thinkingTime = Math.min(800 + userMessage.length * 10, 2500)
    
    setTimeout(() => {
      // Get Oracle response using the response system
      const { response, newContext } = getOracleResponse(userMessage, conversationContext)
      
      setConversationContext(newContext)
      setMessages((prev) => [
        ...prev,
        {
          role: "oracle",
          content: response.text,
          mood: response.mood,
        },
      ])
      setIsTyping(false)
    }, thinkingTime)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Check if user is asking about a crypto term
  const checkForTermExplanation = (text: string): string | null => {
    const lowerText = text.toLowerCase()
    for (const [term, explanation] of Object.entries(cryptoTermsExplanations)) {
      if (lowerText.includes(term.toLowerCase()) && 
          (lowerText.includes("what is") || 
           lowerText.includes("what does") || 
           lowerText.includes("explain") ||
           lowerText.includes("meaning"))) {
        return explanation
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <Aurora colorStops={["#06b6d4", "#3b82f6", "#06b6d4"]} amplitude={0.8} blend={0.6} />
      </div>
      <div className="fixed inset-0 lab-grid opacity-20 pointer-events-none -z-5" />

      <MainNav />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 pt-28 relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 lab-glow">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-mono uppercase tracking-wider text-primary">
                TALK TO ORACLE
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                AI-POWERED TRENCH INTELLIGENCE
              </p>
            </div>
          </div>
          
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Oracle Character Display */}
        <div className="lab-card p-8 flex items-center justify-center min-h-[200px] bg-card/30">
          <OracleCharacter isThinking={isTyping} />
        </div>

        {/* Chat Container */}
        <div className="lab-card p-6 flex flex-col gap-4 min-h-[400px] max-h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
                <div className="rounded-full bg-primary/10 p-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-mono text-primary mb-2">
                    Start Your Conversation
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono max-w-md">
                    Ask The Oracle about token analysis, market trends, trading wisdom, 
                    or anything related to the Solana trenches.
                  </p>
                </div>
                <SuggestedPrompts onSelect={handleSuggestedPrompt} />
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  msg.role === "user" ? (
                    <div key={idx} className="flex justify-end">
                      <div className="max-w-[80%] p-3 rounded-lg bg-primary/20 text-primary border border-primary/50">
                        <p className="text-sm font-mono">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <OracleMessage 
                      key={idx}
                      content={msg.content}
                      mood={msg.mood}
                      isLatest={idx === messages.length - 1}
                    />
                  )
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-lg animate-pulse">🔮</span>
                        <p className="text-sm font-mono text-muted-foreground">
                          The Oracle is contemplating
                          <span className="animate-pulse">...</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask The Oracle..."
              disabled={isTyping}
              className="flex-1 bg-background border border-border rounded px-4 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline font-mono text-sm">Send</span>
            </button>
          </div>
        </div>

        {/* Conversation Stats */}
        {conversationContext.messageCount > 0 && (
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
            <span>Messages: {conversationContext.messageCount}</span>
            {conversationContext.topicsDiscussed.length > 0 && (
              <span>Topics: {conversationContext.topicsDiscussed.join(", ")}</span>
            )}
          </div>
        )}
      </main>
    </div>
  )
}