'use client'

import { useTheme } from 'next-themes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Định nghĩa type cho các option
export type ToastOptions = {
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
    autoClose?: number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
}

// Component chính
export const Toast = () => {

    const { theme } = useTheme();

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "wata-dark" ? "dark" : "light"}
            style={{
                fontSize : '0.75rem'
            }}
        />
    );
};

// Utility functions để show toast
export const showToast = {
    success: (message: string, options?: ToastOptions) => {
        toast.success(message, options);
    },
    error: (message: string, options?: ToastOptions) => {
        toast.error(message, options);
    },
    warning: (message: string, options?: ToastOptions) => {
        toast.warning(message, options);
    },
    info: (message: string, options?: ToastOptions) => {
        toast.info(message, options);
    }
};