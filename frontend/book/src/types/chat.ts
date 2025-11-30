export type ChatMessageType = 'user' | 'ai';

export interface ChatMessage {
  id: string
  type: ChatMessageType;
  text: string;
  timestamp: string;
  citations?: string[];
}

export type ChatScope = 'global' | 'chapter' | 'selection';

export interface ChatResponse {
  response: string;
  citations?: string[];
}
