import { Role } from "../types/chat";

export async function fetchChatbotResponse(
  formattedMessages: {
    role: Role;
    content: string;
  }[],
  apiUrl: string
) {
  const API_URL =
    apiUrl ||
    (typeof window !== "undefined"
      ? (window as any).__docusaurus?.siteConfig?.customFields?.apiUrl
      : undefined) ||
    "";

  if (!API_URL) {
    return "Error: API URL not configured.";
  }

  try {
    const response = await fetch(`${API_URL}/ai_assistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedMessages),
    });

    const data = await response.text();
    return data;
  } catch {
    return "Error: Unable to reach the AI assistant service.";
  }
}
