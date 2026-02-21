"use client";
import { PanelLeftClose, ChevronRight, FileText, Settings } from "lucide-react";

export default function Sidebar({ questions, activeId, onSelect }) {
    return (
        <div className="flex h-full shrink-0">
            {/* Left Column - Questions */}
            <div className="w-16 border-r border-gray-200 dark:border-[#2a323d] bg-gray-50 dark:bg-[#0d0d0d] flex flex-col items-center py-4 gap-4 transition-colors">
                <button className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-gray-300 dark:border-[#2a323d] text-gray-500 hover:text-gray-800 dark:text-white dark:hover:text-white transition-colors" title="Collapse">
                    <PanelLeftClose size={20} />
                </button>

                <div className="flex flex-col gap-4 w-full px-2 mt-2">
                    {questions.map((q, i) => {
                        const isActive = q.id === activeId;
                        return (
                            <div key={q.id} className="flex flex-col items-center gap-2 w-full">
                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    S{i + 1}
                                </div>
                                <button
                                    onClick={() => onSelect(q.id)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-[8px] font-bold text-sm transition-colors border
                ${isActive
                                            ? "border-[#00ea64] text-[#00ea64] dark:bg-[#1e242e] bg-[#eefbf2]"
                                            : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1e242e]"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column - Secondary Tools */}
            <div className="w-[52px] border-r border-gray-200 dark:border-[#2a323d] bg-gray-50 dark:bg-[#0d0d0d] flex flex-col items-center justify-between transition-colors">
                <div className="w-full flex flex-col items-center border-b border-gray-200 dark:border-[#2a323d] py-4">
                    <button className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-gray-300 dark:border-[#2a323d] text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors" title="Description">
                        <FileText size={20} />
                    </button>
                </div>

                <div className="py-4">
                    <button className="text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-white transition-colors" title="Settings">
                        <Settings size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
