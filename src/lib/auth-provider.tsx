"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import auth from "@/lib/auth";

import { AuthService } from "@/services/auth.service";
import { LoginType } from "@/@types";
import { showToast } from "@/components/toast/Toast";
import { TokenResponseDto } from "@/helper/type";
import { useRouter } from "next/navigation";
import axios from "axios";  // Import axios for role fetching
import menu from "@/lib/menu";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginType: LoginType) => Promise<TokenResponseDto | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(async () => {
    console.log("logging out");
    setIsLoading(true);
    try {
      await auth.logout();
      setIsAuthenticated(false);
      menu.removeMenuOptions();  // Clear role on logout
      router.replace("/login");
      Cookies.remove("roles");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const refresh = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const response = await AuthService.refresh();
        if (response && response.data.accessToken) {
          auth.saveToken(response.data.accessToken, response.data.refreshToken);
        }
      } catch (error) {
        console.error("Refresh error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchRole = useCallback(async () => {
    setIsLoading(true); // Set loading to true while fetching roles
    try {
      const userId = auth.getUserId();
      const response = await axios.get<{
        isSuccess: boolean;
        data: string[]; // Assuming roles are an array of strings
        errors?: string[];
      }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}roles/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use the access token for the request
        },
      });
  
      console.log(response);
  
      if (response && response.data) {
        const roles = response.data.data; // Extract only the roles array
        console.log(roles);
  
        // Join the roles array into a single string, separated by commas
        const rolesString = roles.join(","); // Joins the array items into a string like "Admin,User,Manager"
  
        // Store the joined string in the cookie
        Cookies.set("roles", rolesString);
  
        // Update menu options based on roles
        menu.setMenuOptions();
      } else {
        throw new Error("Invalid roles response");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error; // Rethrow error so it can be handled by the calling function
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  }, []);
  

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedAccessToken = auth.isAuthenticated();
      const refreshable = auth.hasRefreshToken();
  
      if (storedAccessToken) {
        setIsAuthenticated(true);
        await fetchRole();  // Fetch the role after authentication
      } else if (refreshable) {
        await refresh();
        setIsAuthenticated(auth.isAuthenticated());
        await fetchRole();  // Fetch the role after refreshing token
      }
    } catch {
      await logout();
    } finally {
      setIsLoading(false);
    }
  }, [fetchRole, logout, refresh]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (loginType: LoginType): Promise<TokenResponseDto | null> => {
      try {
        // First, log the user in and get the token
        const response = await AuthService.login(loginType);

        if (response && response.data.accessToken && response.data.refreshToken) {
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          // Save the token as TokenResponseDto
          const tokenResponse: TokenResponseDto = {
            accessToken,
            refreshToken,
            tokenType: response.data.tokenType,
            expiresIn: response.data.expiresIn,
          };
          auth.saveToken(accessToken, refreshToken);
          auth.saveUser(accessToken);

          setIsAuthenticated(true);

          // Fetch the role after login
          await fetchRole();

          return tokenResponse; // Return the TokenResponseDto
        } else {
          showToast.error("Invalid credentials. Please check your username/password!");
          throw new Error("Invalid credentials"); // Handle incorrect login
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Login error:", error);
        if (error.message === "Unauthorized") {
          await logout();
          console.log("You do not have permission to access this page.");
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchRole, logout]
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
