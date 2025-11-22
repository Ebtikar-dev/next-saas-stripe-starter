import "server-only";

import { cache } from "react";
import { auth } from "@/auth";
import apiClient from "./api-client";

export const getCurrentUser = cache(async () => {
  // First try NextAuth (for backward compatibility)
  const session = await auth();
  if (session?.user) {
    return session.user;
  }

  // If no NextAuth session, try backend auth
  const token = apiClient.getToken();
  if (token) {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.ok && response.user) {
        return response.user;
      }
    } catch (error) {
      console.error("Backend auth check failed:", error);
    }
  }

  return undefined;
});