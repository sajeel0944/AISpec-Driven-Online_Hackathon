export interface SignupFormData {
  username: string;
  email: string;
  education: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  usernameOrEmail: string;
  password: string;
}

export interface AuthContextValue {
  user?: { id: string; username: string; email: string } | null;
  signIn?: (data: SignInFormData) => Promise<void>;
  signOut?: () => Promise<void>;
}

export interface CreateAccount {
  username: string;
  email: string;
  education: string;
  password: string;
}
