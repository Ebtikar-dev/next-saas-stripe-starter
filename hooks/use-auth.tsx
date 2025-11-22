"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient, { BackendUser, AuthResponse } from "@/lib/api-client";

interface AuthContextType {
  user: BackendUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => void;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Check for existing token and validate user on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiClient.getToken();
      
      if (token) {
        try {
          const response = await apiClient.getCurrentUser();
          if (response.ok && response.user) {
            setUser(response.user);
          } else {
            // Token is invalid, clear it
            apiClient.setToken(null);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          apiClient.setToken(null);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (token) {
        apiClient.setToken(token);
        
        // Get user info with the new token
        apiClient.getCurrentUser()
          .then(response => {
            if (response.ok && response.user) {
              setUser(response.user);
              toast.success("تم تسجيل الدخول بنجاح!");
              
              // Clean up URL
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, '', cleanUrl);
              
              router.push('/dashboard');
            } else {
              toast.error("فشل تسجيل الدخول");
              apiClient.setToken(null);
            }
          })
          .catch(error => {
            console.error("Failed to get user info:", error);
            toast.error("فشل الحصول على معلومات المستخدم");
            apiClient.setToken(null);
          });
      }
    };

    // Check if we're on the Google auth success page
    if (window.location.pathname.includes('/login/google-auth-success')) {
      handleGoogleCallback();
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      
      if (response.ok && response.user) {
        setUser(response.user);
        toast.success("تم تسجيل الدخول بنجاح!");
        router.push('/dashboard');
      } else {
        toast.error(response.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.signup(name, email, password);
      
      if (response.ok) {
        toast.success(response.message || "تم إنشاء الحساب بنجاح!");
      } else {
        toast.error(response.message || "فشل إنشاء الحساب");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  const loginWithGoogle = () => {
    apiClient.initiateGoogleAuth();
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    toast.success("تم تسجيل الخروج");
    router.push('/login');
  };

  const verifyEmail = async (email: string, otp: string) => {
    try {
      const response = await apiClient.verifyEmail(email, otp);
      
      if (response.ok) {
        toast.success(response.message || "تم التحقق من البريد الإلكتروني بنجاح!");
      } else {
        toast.error(response.message || "فشل التحقق من البريد الإلكتروني");
      }
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("حدث خطأ أثناء التحقق من البريد الإلكتروني");
    }
  };

  const resendOtp = async (email: string) => {
    try {
      const response = await apiClient.resendOtp(email);
      
      if (response.ok) {
        toast.success(response.message || "تم إعادة إرسال الكود بنجاح!");
      } else {
        toast.error(response.message || "فشل إعادة إرسال الكود");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("حدث خطأ أثناء إعادة إرسال الكود");
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const response = await apiClient.requestPasswordReset(email);
      
      if (response.ok) {
        toast.success(response.message || "تم إرسال رابط إعادة تعيين كلمة المرور!");
      } else {
        toast.error(response.message || "فشل إرسال رابط إعادة التعيين");
      }
    } catch (error) {
      console.error("Password reset request error:", error);
      toast.error("حدث خطأ أثناء طلب إعادة تعيين كلمة المرور");
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await apiClient.resetPassword(token, newPassword);
      
      if (response.ok) {
        toast.success(response.message || "تم إعادة تعيين كلمة المرور بنجاح!");
        router.push('/login');
      } else {
        toast.error(response.message || "فشل إعادة تعيين كلمة المرور");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    loginWithGoogle,
    logout,
    verifyEmail,
    resendOtp,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}