"use client";
import { Bookmark } from "lucide-react";

export default function QuestionPanel({ question }) {
    const renderContent = (text) => {
        // Simple parser for dummy placeholders
        return text.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;

            if (trimmed.startsWith('- **')) {
                const parts = trimmed.split('**');
                return (
                    <li key={i} className="mb-2 ml-6 list-disc text-gray-700 dark:text-gray-300">
                        <strong className="font-semibold text-gray-900 dark:text-white">{parts[1]}</strong>
                        {parts[2]}
                    </li>
                );
            }

            if (trimmed.startsWith('- ')) {
                return <li key={i} className="mb-2 ml-6 list-disc text-gray-700 dark:text-gray-300">{trimmed.substring(2)}</li>;
            }

            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <h3 key={i} className="font-bold mt-6 mb-2 text-base text-gray-900 dark:text-white">{trimmed.replace(/\*\*/g, '')}</h3>;
            }

            return <p key={i} className="mb-4 text-gray-700 dark:text-gray-300">{line}</p>;
        });
    };

    return (
        <div className="flex-1 w-1/2 md:w-[40%] border-r border-[#d8dee2] dark:border-[#2a323d] bg-[#f3f7f7] dark:bg-[#0f141e] overflow-y-auto p-6 md:p-8 shrink-0 transition-colors custom-scrollbar">
            <div className="max-w-prose text-[15px] leading-relaxed">
                <h1 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                    <Bookmark size={24} className="text-gray-500 dark:text-gray-400" />
                    {question.title}
                </h1>

                <div className="text-gray-800 dark:text-gray-200">
                    {renderContent(question.description)}
                </div>
            </div>
        </div>
    );
}
