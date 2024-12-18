// app/(public)/layout.tsx
//main PAGE
"use client";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/loading/loading";
import { useAuth } from "@/lib/auth-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const mainContentRef = useRef(null);

  // Nếu người dùng đã xác thực và vẫn đang mở các trang đăng nhập, chuyển hướng đến trang chào mừng
  useEffect(() => {
    if (isAuthenticated && pathname === "/login") {
      router.replace(`/dashboard`);
    }

  }, [isAuthenticated, isLoading, router, pathname]);

  // Nếu đang loading, hiển thị spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="drawer">
        <div className="drawer-content flex flex-col">
          <main className="flex-1 overflow-y-auto" ref={mainContentRef}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
