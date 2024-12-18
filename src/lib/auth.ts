// lib/auth.ts
"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import menu from "./menu"; // Import the menu object

interface decodedToken {
  nameid?: string;
  email?: string;
}


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
    Cookies.remove("userid");
    Cookies.remove("email");
    Cookies.remove("role");
    // menu.removeMenuOptions();
    // Optional: Notify the application about the logout
    console.log("Tokens cleared, user logged out.");

    return true;
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get("accessToken");
  },
  hasRefreshToken: (): boolean => {
    return !!Cookies.get("refreshToken");
  },

  saveUser: (accessToken: string) => {
    try {
      const decoded: decodedToken = jwtDecode(accessToken); // Correct usage of jwtDecode

      // Ensure decoded object is valid and set the cookies only if the properties exist
      if (decoded.nameid) {
        Cookies.set("userid", decoded.nameid, {
          secure: true,       // Ensure the cookie is sent over HTTPS
          sameSite: "strict", // Prevent cross-site requests
        });
      }

      if (decoded.email) {
        Cookies.set("email", decoded.email, {
          secure: true,
          sameSite: "strict",
        });
      }
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  },

  getUserId: (): string => {
    const userId = Cookies.get("userid");
    if (userId) {
      return userId;
    }
    throw new Error("User ID not found");
  }
}

export default auth;