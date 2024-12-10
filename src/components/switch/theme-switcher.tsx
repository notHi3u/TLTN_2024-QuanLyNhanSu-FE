// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <>
            <Button
                isIconOnly
                size="lg"
                variant="bordered"
                className="bg-primary-500 border-primary-300"
                onClick={toggleTheme}
            >
                {theme === 'wata-light' ? (
                    <CiLight className="w-[60%] h-auto" />
                ) : (
                    <MdDarkMode className="w-[60%] h-auto" />
                )}
            </Button>
        </>
    )
};