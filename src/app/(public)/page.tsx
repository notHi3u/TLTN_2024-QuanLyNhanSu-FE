// app/some-path/page.tsx (hoặc file tương ứng của bạn)
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/loading";
import { useLoading } from "@/lib/loading-provider";

function Page() {
  const router = useRouter();
  const { setLoading } = useLoading(); // Khởi tạo setLoading từ LoadingProvider

  useEffect(() => {
    const redirect = async () => {
      setLoading(true); // Bắt đầu trạng thái loading
      await router.replace(`/login`);
      setLoading(false); // Kết thúc trạng thái loading sau khi chuyển hướng
    };
    redirect();
  }, [router, setLoading]);

  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner size="large" /> {/* Hiển thị spinner */}
    </div>
  );
}

export default Page;
