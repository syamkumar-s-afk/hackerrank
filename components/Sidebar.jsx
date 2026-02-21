"use client";
import { PanelLeftClose, ChevronRight } from "lucide-react";

export default function Sidebar({ questions, activeId, onSelect }) {
    return (
        <div className="w-16 border-r border-gray-200 dark:border-[#2a323d] bg-gray-50 dark:bg-[#0f141e] flex flex-col items-center py-4 gap-4 shrink-0 transition-colors">
            <button className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" title="Collapse">
                <PanelLeftClose size={20} />
            </button>

            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
                S1
            </div>

            <div className="flex flex-col gap-3 w-full px-2 mt-2">
                {questions.map((q, i) => {
                    const isActive = q.id === activeId;
                    return (
                        <button
                            key={q.id}
                            onClick={() => onSelect(q.id)}
                            className={`w-full aspect-square flex items-center justify-center rounded font-semibold text-sm transition-colors border
                ${isActive
                                    ? "border-[#00ea64] text-[#00ea64] dark:bg-[#1e242e] bg-[#eefbf2]"
                                    : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1e242e]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
