// lib/auth.ts
"use client";

import Cookies from "js-cookie";

const auth = {
  saveToken: (accessToken: string, refreshToken: string) => {
    // Set accessToken with 1 hour expiry
    Cookies.set("accessToken", accessToken, {
      expires: 55 / 1440, // 55 minutes (55 minutes / 1440 minutes in a day)
      //expires: 30 / 86400, // 30 seconds (30 seconds / 86400 seconds in a day)
      sameSite: "strict",
    });

    // Set refreshToken with 7 days expiry
    Cookies.set("refreshToken", refreshToken, {
      expires: 7, // 7 days
      sameSite: "strict",
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get("refeshToken");
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
