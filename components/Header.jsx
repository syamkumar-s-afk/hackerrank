"use client";
import { useTheme } from "../context/ThemeContext";
import { useTest } from "../context/TestContext";
import { Layout, Sun, Moon, HelpCircle, Clock } from "lucide-react";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { timeLeft } = useTest();

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Add leading zero if seconds < 10 (e.g., 09)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <header className="flex items-center justify-between px-4 h-14 bg-white dark:bg-[#0d0d0d] border-b border-hr-border shrink-0">
            {/* Timer / Left Area */}
            <div
                className="flex items-center gap-1.5 cursor-pointer"
                style={{
                    backgroundColor: '#033a15',          // darker green
                    borderRadius: '20px',                // pill shape
                    padding: '2px 8px',                  // slight increase horizontally
                    fontSize: '11px',                    // smaller text
                    color: '#62ff7d',                    // softer green text
                    boxShadow: '0 0 6px rgba(0, 255, 0, 0.25)' // subtle glow
                }}
            >
                <Clock size={11} strokeWidth={2.3} color="#62ff7d" />
                <span>{minutes} min {formattedSeconds} sec</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 text-hr-text-dimmed">
                <button className="flex items-center gap-2 hover:text-hr-text transition-colors" title="Layout">
                    <span className="text-sm">Layout</span>
                    <Layout size={18} />
                </button>

                <button onClick={toggleTheme} className="hover:text-hr-text transition-colors" title="Toggle Theme">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="hover:text-hr-text transition-colors" title="Help">
                    <HelpCircle size={18} />
                </button>

                <button className="ml-2 bg-[var(--hr-text)] text-[var(--hr-bg)] border-none px-4 py-1.5 rounded text-sm font-semibold hover:opacity-90 transition-opacity">
                    Save & Proceed
                </button>
            </div>
        </header>
    );
}
