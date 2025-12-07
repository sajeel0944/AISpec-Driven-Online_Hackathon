// Message format for backend communication
export type Role = "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

export interface ChatMessage {
  id: string
  role: Role;
  text: string;
  timestamp: string;
  citations?: string[];
}

export type ChatScope = 'global' | 'chapter' | 'selection';

export interface ChatResponse {
  response: string;
  citations?: string[];
}
