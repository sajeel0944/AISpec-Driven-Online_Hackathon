import React, { useState, useRef, useEffect, JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { ChatMessage, ChatRequest, ChatResponse, ChatScope } from '../../types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatbotProps {
  chapterId?: string; // Optional chapter ID for chapter-scoped queries
}

export default function Chatbot({ chapterId }: ChatbotProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatScope, setChatScope] = useState<ChatScope>('global'); // Default to global
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

          const formattedMessages = [...messages, newUserMessage].map(msg => ({
            role: msg.type, // Mapping 'user'/'ai' to 'role' field
            content: msg.text,
          }));
    try {
      const response = await fetch(`http://localhost:8000/ai_assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedMessages),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      const newAiMessage: ChatMessage = {
        id: uuidv4(),
        type: 'ai',
        text: data.response,
        timestamp: new Date().toISOString(),
        citations: data.citations,
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (err) {
      setError(`Failed to get response from chatbot: ${err.message}`);
      console.error('Chatbot error:', err);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        type: 'ai',
        text: `Error: ${err.message}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '−' : '💬'}
      </button>

      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <span>RAG Chatbot</span>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.aiMessage}`}>
                {msg.text}
                {msg.citations && msg.citations.length > 0 && (
                  <div className={styles.citations}>
                    Citations: {msg.citations.join(', ')}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.aiMessage}`}>Thinking...</div>
            )}
            {error && (
              <div className={`${styles.message} ${styles.aiMessage}`}>Error: {error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputContainer}>
            <select
              className={styles.scopeSelector}
              value={chatScope}
              onChange={(e) => setChatScope(e.target.value as ChatScope)}
              disabled={isLoading}
            >
              <option value="global">Global</option>
              <option value="chapter" disabled={!chapterId}>Chapter</option>
              {/* <option value="selection">Selection</option> */}
            </select>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
