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
      type: "user",
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    const formattedMessages = [...messages, newUserMessage].map((msg) => ({
      role: msg.type, // Mapping 'user'/'ai' to 'role' field
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

      const data: ChatResponse = await response.json();
      const newAiMessage: ChatMessage = {
        id: uuidv4(),
        type: "ai",
        text: data.response,
        timestamp: new Date().toISOString(),
        citations: data.citations,
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (err) {
      setError(`Failed to get response from chatbot: ${err.message}`);
      console.error("Chatbot error:", err);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        type: "ai",
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

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-ifm-primary text-white border-none rounded-full w-[60px] h-[60px] text-4xl flex justify-center items-center cursor-pointer shadow-xl z-[1000] transition-all duration-300 ease-in hover:bg-ifm-primary-dark hover:scale-105"
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
          // Inline fallback styles ensure correct positioning even if Tailwind isn't applied
          style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000, width: 360, maxWidth: '90vw', height: '72vh', maxHeight: 600, display: 'flex', flexDirection: 'column' }}
          className="bg-ifm-background border border-ifm-border rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
        >
          <h1 className="bg-blend-darken">hasduysga</h1>
          {/* Header */}
          <header className="flex items-center justify-between bg-ifm-primary text-white px-4 py-3">
            <h3 id="chatbot-title" className="text-lg font-semibold">
              RAG Chatbot
            </h3>
            <div className="flex items-center gap-2">
              <button
                aria-label="Minimize chat"
                title="Minimize"
                className="text-white opacity-80 hover:opacity-100 p-1 rounded"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages - semantic list with live region for screen readers */}
          <section className="flex-1 p-4 overflow-y-auto bg-ifm-surface" aria-live="polite">
            <ul className="space-y-3">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={`max-w-[85%] py-2.5 px-3.5 rounded-2xl break-words leading-normal ${
                    msg.type === "user"
                      ? "ml-auto bg-ifm-primary-light text-ifm-font rounded-br-sm"
                      : "mr-auto bg-white text-ifm-font border border-ifm-border rounded-bl-sm shadow-sm"
                  }`}
                  role={msg.type === "user" ? "article" : "article"}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="text-xs text-ifm-secondary mt-1 opacity-80">Citations: {msg.citations.join(", ")}</div>
                  )}
                </li>
              ))}

              {isLoading && (
                <li className="max-w-[85%] py-2.5 px-3.5 rounded-2xl bg-ifm-surface text-ifm-font">Thinking...</li>
              )}

              {error && (
                <li className="max-w-[85%] py-2.5 px-3.5 rounded-2xl bg-ifm-surface text-ifm-font">Error: {error}</li>
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
            className="border-t border-ifm-border bg-ifm-background px-3 py-3 flex items-center gap-2"
          >
            <label htmlFor="chat-scope" className="sr-only">
              Scope
            </label>
            <select
              id="chat-scope"
              className="py-2 px-3 border border-ifm-border rounded-full bg-ifm-surface text-ifm-font text-sm appearance-none pr-8"
              value={chatScope}
              onChange={(e) => setChatScope(e.target.value as ChatScope)}
              disabled={isLoading}
            >
              <option value="global">Global</option>
              <option value="chapter" disabled={!chapterId}>
                Chapter
              </option>
            </select>

            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              className="flex-1 border border-ifm-border rounded-full py-2.5 px-4 bg-white text-ifm-font text-sm focus:ring-2 focus:ring-ifm-primary focus:outline-none"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              aria-label="Chat input"
            />

            <button
              type="submit"
              className="bg-ifm-primary text-white rounded-full py-2.5 px-4 font-semibold disabled:opacity-60"
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
