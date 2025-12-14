import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, ChatScope } from "@site/src/types/chat";
import { fetchChatbotResponse } from "@site/src/api/chatbot";

interface ChatbotProps {
  chapterId?: string;
}

export default function Chatbot({ chapterId }: ChatbotProps) {
  const { siteConfig } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      text: "Hello! I'm your AI learning assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatScope, setChatScope] = useState<ChatScope>("global");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const API_URL = siteConfig.customFields.apiUrl;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const quickActions = [
    "Explain this concept",
    "Give me an example",
    "What are the key points?",
    "Help me understand this better",
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    if (!isOpen) setIsOpen(true);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    const formattedMessages = [...messages, newUserMessage].map((msg) => ({
      role: msg.role,
      content: msg.text,
    }));

    try {
    const response = await fetchChatbotResponse(formattedMessages, String(API_URL));
      
      // Parse and clean response
      let cleanedText = response;
      
      try {
        const jsonData = JSON.parse(response);
        cleanedText = typeof jsonData === "string" ? jsonData : jsonData.content || JSON.stringify(jsonData);
      } catch {
        cleanedText = response
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\\//g, "/");
      }

      const newAiMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        text: cleanedText.trim(),
        timestamp: new Date().toISOString(),
        citations: ["Source 1", "Source 2"], // Replace with actual citations from API
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (err) {
      setError(`Failed to get response: ${err.message}`);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Keyboard shortcuts and accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Text selection handler
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      if (selectedText && selectedText.length > 0 && selection?.rangeCount > 0) {
        setInputMessage(`Explain this: "${selectedText}"`);
        if (!isOpen) {
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("mouseup", handleTextSelection);
    return () => document.removeEventListener("mouseup", handleTextSelection);
  }, [isOpen]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="chatbot-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        title={isOpen ? "Close chatbot (Esc)" : "Open chatbot (Ctrl+/)"}
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          className="chatbot-panel"
        >
          {/* Header */}
          <header className="chatbot-header">
            <div className="chatbot-title-wrapper">
              <div className="chatbot-avatar">AI</div>
              <div>
                <h3 id="chatbot-title" className="chatbot-title">
                  Learning Assistant
                </h3>
                <p className="chatbot-subtitle">Powered by RAG AI</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                aria-label="Close chat"
                title="Close (Esc)"
                className="chatbot-minimize-button"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="chatbot-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages Section */}
          <section className="chatbot-messages-section" aria-live="polite">
            {messages.length <= 1 && (
              <div className="chatbot-welcome-message">
                <h4>👋 Welcome to Learning Assistant!</h4>
                <p>Ask me anything about the content, or try these quick actions:</p>
                <div className="chatbot-quick-actions">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-button"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ul className="chatbot-messages-list">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`chatbot-message-bubble ${
                    msg.role === "user"
                      ? "chatbot-user-message"
                      : "chatbot-ai-message"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className="message-timestamp">
                    {formatTime(msg.timestamp)}
                  </div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="chatbot-citations">
                      <span style={{ opacity: 0.8 }}>Sources: </span>
                      {msg.citations.map((citation, idx) => (
                        <span key={idx} className="citation-badge">
                          {citation}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              {isLoading && (
                <li className="chatbot-typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </li>
              )}

              {error && (
                <li className="chatbot-info-message">
                  ⚠️ {error}
                </li>
              )}
            </ul>
            <div ref={messagesEndRef} />
          </section>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="chatbot-input-form"
          >
            <div className="chatbot-input-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                className="chatbot-text-input"
                placeholder="Ask your question here... (Press Enter to send)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                aria-label="Type your message"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="chatbot-send-button"
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
              title="Send message (Enter)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="send-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}