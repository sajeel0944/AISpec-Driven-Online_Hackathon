import React, { useState, useRef, useEffect, JSX } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, ChatResponse, ChatScope } from "@site/src/types/chat";

interface ChatbotProps {
  chapterId?: string; // Optional chapter ID for chapter-scoped queries
}

export default function Chatbot({ chapterId }: ChatbotProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatScope, setChatScope] = useState<ChatScope>("global"); // Default to global
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
      role: msg.role, // Mapping 'user'/'ai' to 'role' field
      content: msg.text,
    }));
    try {
      const response = await fetch(`http://localhost:8000/ai_assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedMessages),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      
      // Clean up the response: remove escape sequences and parse properly
      let cleanedText = data;
      try {
        // Try to parse as JSON first (in case backend sends JSON)
        const jsonData = JSON.parse(data);
        cleanedText = typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData);
      } catch {
        // If not JSON, treat as plain text and remove escape sequences
        cleanedText = data.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\//g, '/');
      }
      
      const newAiMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        text: cleanedText.trim(),
        timestamp: new Date().toISOString(),
        citations: [""],
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (err) {
      setError(`Failed to get response from chatbot: ${err.message}`);
      console.error("Chatbot error:", err);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        text: `Error: ${err.message}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  // Accessibility: focus the input when opening and close on Escape
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      inputRef.current?.focus();
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Listen for text selection on the page and add it to input
  useEffect(() => {
    const handleTextSelection = () => {
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText && selectedText.length > 0) {
        setInputMessage("Explain this :"+selectedText);
        // Open chatbot if text is selected
        if (!isOpen) {
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="chatbot-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "−" : "💬"}
      </button>

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
            <h3 id="chatbot-title" className="chatbot-title">
              RAG Chatbot
            </h3>
            <div className="chatbot-header-actions">
              <button
                aria-label="Minimize chat"
                title="Minimize"
                className="chatbot-minimize-button"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close chat</span>
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

          {/* Messages - semantic list with live region for screen readers */}
          <section className="chatbot-messages-section" aria-live="polite">
            <ul className="chatbot-messages-list">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`chatbot-message-bubble ${
                    msg.role === "user"
                      ? "chatbot-user-message"
                      : "chatbot-ai-message"
                  }`}
                  role={msg.role === "user" ? "article" : "article"}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="chatbot-citations">
                      Citations: {msg.citations.join(", ")}
                    </div>
                  )}
                </li>
              ))}

              {isLoading && (
                <li className="chatbot-info-message">Thinking...</li>
              )}

              {error && (
                <li className="chatbot-info-message">Error: {error}</li>
              )}
            </ul>
            <div ref={messagesEndRef} />
          </section>

          {/* Input area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="chatbot-input-form"
          >
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              className="chatbot-text-input"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              aria-label="Chat input"
            />

            <button
              type="submit"
              className="chatbot-send-button"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
