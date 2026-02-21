"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Layout, Sun, Moon, HelpCircle, Clock } from "lucide-react";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const [timeLeft, setTimeLeft] = useState(3599); // 59 minutes, 59 seconds

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Add leading zero if seconds < 10 (e.g., 09)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <header className="flex items-center justify-between px-4 h-14 bg-white dark:bg-[#0f141e] border-b border-gray-200 dark:border-[#2a323d] shrink-0">
            {/* Timer / Left Area */}
            <div className="flex items-center gap-2 text-sm text-[#00ea64]">
                <Clock size={16} />
                <span className="font-semibold">{minutes} min {formattedSeconds} sec</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors" title="Layout">
                    <span className="text-sm">Layout</span>
                    <Layout size={18} />
                </button>

                <button onClick={toggleTheme} className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Toggle Theme">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="hover:text-gray-900 dark:hover:text-white transition-colors" title="Help">
                    <HelpCircle size={18} />
                </button>

                <button className="ml-2 bg-white text-black border border-gray-300 dark:border-none px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
                    Save & Proceed
                </button>
            </div>
        </header>
    );
}
