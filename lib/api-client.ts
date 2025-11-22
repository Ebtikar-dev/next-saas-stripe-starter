const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  ok: boolean;
  token?: string;
  user?: BackendUser;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as any).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token);
      } else {
        localStorage.removeItem("auth_token");
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Google OAuth
  initiateGoogleAuth() {
    const googleAuthUrl = `${this.baseURL}/api/v1/auth/google`;
    window.location.href = googleAuthUrl;
  }

  // Email/Password Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async signup(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    return response;
  }

  async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  async resendOtp(email: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async requestPasswordReset(email: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/v1/auth/request-reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>(`/api/v1/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    });
  }

  async getCurrentUser(): Promise<AuthResponse> {
    if (!this.token) {
      throw new Error("No authentication token");
    }

    return this.request<AuthResponse>("/api/v1/auth/me");
  }

  logout() {
    this.setToken(null);
    // Optionally call backend logout endpoint if available
  }
}

export const apiClient = new ApiClient();
export default apiClient;
