"use client";
import { Play } from "lucide-react";

export default function Footer() {
    return (
        <div className="flex items-center">
            {/* Single Run Code Button matching Image 2 reference */}
            <button className="flex items-center gap-2 border border-[--color-hr-green] text-[--color-hr-green] px-4 py-1.5 text-sm font-medium rounded hover:bg-[--color-hr-green] hover:bg-opacity-10 transition-colors">
                <Play size={14} fill="transparent" strokeWidth={2} /> Run Code
            </button>
        </div>
    );
}
