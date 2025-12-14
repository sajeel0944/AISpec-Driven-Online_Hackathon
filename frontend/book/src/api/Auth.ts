import { CreateAccount, SignInFormData } from "../types/auth";

export async function signUpResponse(userData: CreateAccount, apiUrl: string) {
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
    const response = await fetch(`${API_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch {
    return {"status": "error", "message": "Unable to reach the sign-up service."};
  }
}


export async function signInResponse(userData: SignInFormData, apiUrl: string) {
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
    const response = await fetch(`${API_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch {
    return {"status": "error", "message": "Unable to reach the sign-in service."};
  }
}
