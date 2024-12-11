// components/AuthProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import auth from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { LoginType } from "@/@types";
import { showToast } from "@/components/toast/Toast";
import { TokenResponseDto } from "@/helper/type";


interface AuthContextType {
  isAuthenticated: boolean;
  //isLoading: boolean;
  loading: boolean;
  //hasAccess: boolean;
  login: (loginType: LoginType) => Promise<TokenResponseDto | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  //const [hasAccess, setHasAccess] = useState(false); // new state for access control
  const router = useRouter();

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await auth.logout();
      setIsAuthenticated(false);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const refresh = useCallback(
    async () => {
      setLoading(true);
      try {
        const response = await AuthService.refresh();
        if (response && response.data.accessToken) {
          auth.saveToken(response.data.accessToken, response.data.refreshToken);
        }
      } catch (error) {
        console.error("Refresh error:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const checkAuth = useCallback(async () => {
    const authStatus = auth.isAuthenticated();
  
    // If not authenticated, try to refresh
    if (!authStatus) {
      try {
        await refresh(); // Attempt to refresh the access token
        const refreshedAuthStatus = auth.isAuthenticated();
        setIsAuthenticated(refreshedAuthStatus);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Refresh failed, logging out.");
        await logout(); // If refresh fails, log out the user
      }
    } else {
      setIsAuthenticated(authStatus); // User is authenticated, proceed
    }
  
    setLoading(false);
  }, [logout, refresh]);
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  

  useEffect(() => {
    console.log(isAuthenticated); // Log the current value of isAuthenticated
  }, [isAuthenticated]); // This will log whenever isAuthenticated changes

  const login = useCallback(
    async (loginType: LoginType): Promise<TokenResponseDto | null> => {
      setLoading(true); // Đặt loading thành true ngay khi bắt đầu login
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

          setIsAuthenticated(true);
          return tokenResponse; // Return the TokenResponseDto
        } else {
          showToast.error("Invalid credentials. Please check your username/password !!!");
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
        setLoading(false); // Đặt loading thành false trong finally
      }
    },
    [logout]
  );

  

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout, refresh }}
    >
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
