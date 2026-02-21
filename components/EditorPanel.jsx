"use client";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";
import { Info, Maximize2, RotateCcw, ChevronDown, ChevronUp, Play } from "lucide-react";
import Footer from "./Footer";

export default function EditorPanel({ question }) {
    const { theme } = useTheme();
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function handleEditorBeforeMount(monaco) {
        monaco.editor.defineTheme('hr-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0d0d0d',
            }
        });
    }

    return (
        <div className="flex-[1.5] flex flex-col bg-white dark:bg-[#0d0d0d] overflow-hidden transition-colors relative">
            {/* Editor Header */}
            <div className="h-12 border-b border-gray-200 dark:border-[#2a323d] flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#0d0d0d]">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Language</span>
                    <div className="border border-gray-300 dark:border-[#2a323d] rounded px-3 py-1 flex items-center gap-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1e242e] transition-colors">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Java 21</span>
                        <ChevronDown size={14} className="text-gray-500" />
                    </div>
                    <Info size={16} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <RotateCcw size={16} className="cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors" title="Reset Code" />
                    <Maximize2 size={16} className="cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors" title="Fullscreen" />
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage="java"
                    theme={theme === "dark" ? "hr-dark" : "vs-light"}
                    beforeMount={handleEditorBeforeMount}
                    value={question.codeTemplate}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
                        lineHeight: 22,
                        padding: { top: 16 },
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true,
                        suggestOnTriggerCharacters: true,
                        acceptSuggestionOnEnter: "on",
                        quickSuggestionsDelay: 10,
                    }}
                />
            </div>

            {/* Editor Status Bar (above footer) */}
            <div className="h-8 border-t border-gray-200 dark:border-[#2a323d] flex items-center justify-end px-4 text-xs text-gray-500 dark:text-gray-400 gap-6 shrink-0 bg-white dark:bg-[#1a1a1a]">
                <span>Ln 24, Col 5</span>
                <span className="flex items-center gap-1.5 text-[#00ea64]"><div className="w-1.5 h-1.5 rounded-full bg-[#00ea64]"></div> Autocomplete</span>
                <span>Spaces: 4</span>
                <span>Mode: Normal</span>
            </div>

            {/* Footer / Results Bar */}
            <div className="h-[60px] border-t border-gray-200 dark:border-[#2a323d] flex items-center justify-between px-4 shrink-0 bg-white dark:bg-[#0d0d0d]">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ChevronUp size={16} /> Test Results
                </button>
                <div className="flex items-center gap-3">
                    <button
                        className="flex items-center justify-center bg-transparent cursor-pointer transition-all duration-200 ease hover:bg-[#22c55e] hover:bg-opacity-10"
                        style={{
                            gap: '8px',
                            padding: '6px 18px',
                            height: '38px',
                            border: '1px solid #22c55e',
                            borderRadius: '6px',
                            color: '#22c55e',
                            fontSize: '15px',
                            fontWeight: '600',
                            boxShadow: '0 0 8px #22c55e55'
                        }}
                    >
                        <Play size={15} fill="transparent" strokeWidth={2} style={{ color: '#22c55e' }} /> Run Code
                    </button>
                </div>
            </div>
        </div>
    );
}
