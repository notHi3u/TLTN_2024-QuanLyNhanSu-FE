// lib/auth.ts
"use client";

import Cookies from "js-cookie";

const auth = {
  saveToken: (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken, {
      // expires: 1, // 1 day
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
    });
    Cookies.set("refreshToken", refreshToken, {
      // expires: 1, // 1 day
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get("accessToken");
  },

  logout: async () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    
    // Optional: Notify the application about the logout
    console.log("Tokens cleared, user logged out.");
    
    return true;
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get("accessToken");
  },
};

export default auth;
