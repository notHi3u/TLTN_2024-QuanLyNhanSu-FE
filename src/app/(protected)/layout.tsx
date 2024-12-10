"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/containers/header";
import initAxios from "@/lib/init-axios";
import LeftSidebar from "@/containers/left-sidebar";
import { useAuth } from "@/lib/auth-provider";
// import LoadingSpinner from '@/components/loading/loading';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ workspaceSlug: string }>; // Đảm bảo params là một Promise
}

export default function ProtectedLayout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  //   const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  //   const { user } = useAppSelector((state) => state.users);

  // Fetch user info
  //   useEffect(() => {
  //     const fetchUserInfo = async () => {
  //       await dispatch(getUserInfo());
  //     };
  //     fetchUserInfo();
  //   }, [dispatch]);

  // Khởi tạo Axios chỉ một lần
  useEffect(() => {
    const initializeAxios = async () => {
      await initAxios(router);
    };
    initializeAxios();
  }, [router]);

  // Chuyển hướng đến trang login nếu không được xác thực
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);
  useEffect(() => {
    
  }, []);
  // Hiển thị loading spinner
  // const renderLoadingSpinner = () => (
  //   <div className="flex justify-center items-center h-screen">
  //     <LoadingSpinner size="large" />
  //   </div>
  // );

  // Kiểm tra tình trạng đăng nhập và hiển thị
  //   if (isLoading || !isAuthenticated) {
  //     return renderLoadingSpinner();
  //   }

  useEffect(() => {
    //check main content have scrollbar or not
    const checkScrollbar = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setHasScrollbar(scrollHeight > clientHeight); // Kiểm tra có thanh cuộn hay không
      }
    };

    checkScrollbar(); // Kiểm tra ngay khi component mount

    window.addEventListener("resize", checkScrollbar); // Kiểm tra lại khi resize
    return () => {
      window.removeEventListener("resize", checkScrollbar); // Dọn dẹp event listener
    };
  }, [children]); // Kiểm tra lại khi children thay đổi

  return (
    <div
      className="bg-primary-100 grid grid-cols-1 lg:grid-cols-[auto_1fr] min-h-screen overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Sidebar left */}
      <LeftSidebar isOpen={isOpen} onToggle={setIsOpen} />
      {/* Main content area */}
      <div className="mt-2 grid grid-rows-[auto_1fr] flex-grow rounded-md rounded-b-none overflow-hidden mr-2">
        <Header
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          className={hasScrollbar ? "mr-2" : ""}
        />
        {/* Main content */}
        <div
          className="grid grid-cols-[1fr_auto] flex-grow overflow-auto relative"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div
            className="overflow-auto custom-scroll transition-colors duration-300 ease-in-out"
            ref={containerRef}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Modal layout */}
      {/* <ModalLayout /> */}
    </div>
  );
}
