"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Send, PenTool } from "lucide-react";
import io from "socket.io-client";

export default function ChatNotepad({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to the real-time notepad! You can drop quick notes or chat here.", senderId: "system" }
    ]);
    const [input, setInput] = useState("");
    const [myId, setMyId] = useState("");
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:3001", {
                transports: ['websocket'],
                reconnection: true
            });
        }
        const socket = socketRef.current;

        // Run once on mount to handle already connected socket
        if (socket.connected) {
            setMyId(socket.id);
        }

        const onConnect = () => setMyId(socket.id);
        const onReceiveHistory = (history) => {
            setMessages((prev) => {
                const welcomeMsg = prev.find(m => m.id === 1) || { id: 1, text: "Welcome to the real-time notepad! You can drop quick notes or chat here.", senderId: "system" };
                return [welcomeMsg, ...history];
            });
        };
        const onReceiveMessage = (data) => {
            setMessages((prev) => {
                // Prevent duplicate messages
                if (prev.some(m => m.id === data.id)) return prev;
                return [...prev, data];
            });
        };

        socket.on("connect", onConnect);
        socket.on("message_history", onReceiveHistory);
        socket.on("receive_message", onReceiveMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("message_history", onReceiveHistory);
            socket.off("receive_message", onReceiveMessage);
        };
    }, []);

    // Auto-scroll to bottom of messages when a new message arrives
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || !socketRef.current) return;

        const messageData = {
            id: Date.now(),
            text: input,
            senderId: socketRef.current.id || myId,
        };

        // Send the message to the server to be broadcasted
        socketRef.current.emit("send_message", messageData);
        setInput("");
    };

    return (
        <div className="absolute bottom-20 left-20 w-80 h-[450px] bg-white dark:bg-[#1a1f2b] shadow-2xl rounded-xl border border-gray-200 dark:border-[#2a323d] flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom border-t-4 border-t-blue-500 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#2a323d] bg-gray-50 dark:bg-[#161b22]">
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold">
                    <PenTool size={18} className="text-blue-500" />
                    <span>Notepad & Chat (Live)</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
                {messages.map((msg) => {
                    // If the message is from our own socket or the system, figure out how to style it
                    const isMe = msg.senderId === myId;
                    const isSystem = msg.senderId === "system";

                    return (
                        <div
                            key={msg.id}
                            className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${isSystem
                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 self-center text-center italic w-full"
                                : isMe
                                    ? "bg-blue-600 text-white self-end rounded-tr-none"
                                    : "bg-gray-100 dark:bg-[#2a323d] text-gray-800 dark:text-gray-200 self-start rounded-tl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-100 dark:border-[#2a323d] bg-gray-50 dark:bg-[#161b22]">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a real-time message..."
                        className="w-full bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-[#2a323d] text-gray-800 dark:text-gray-200 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-inter"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors flex items-center justify-center shadow-md disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </div>
    );
}
