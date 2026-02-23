"use client";
import { useRef, useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useTest } from "../../context/TestContext";

export default function MessagePage() {
    const formRef = useRef(null);
    const [status, setStatus] = useState("");
    const { messageContent, setMessageContent } = useTest();

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");
        // shivaguru emailjs
        // service_arxk2a5
        // template_wi5wjhq
        // NcwiRJ2zflNQfNbcb 
        //syam emailjs
        // service_pf729tq
        //template_onyalui
        // ZldIPW7qXycYVhTZa
        emailjs
            .sendForm(
                "service_pf729tq",
                "template_onyalui",
                formRef.current,
                "ZldIPW7qXycYVhTZa"
            )
            .then(
                (result) => {
                    setStatus("Message sent successfully!");
                    formRef.current.reset();
                    setMessageContent(""); // Clear state upon success
                    setTimeout(() => setStatus(""), 3000);
                },
                (error) => {
                    setStatus("Failed to send message. Please try again.");
                }
            );
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4 relative font-sans">
            {/* Back button */}
            <Link
                href="/"
                className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                title="Back to Challenge"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
            </Link>

            <div className="w-full max-w-[280px] bg-[#111418] p-5 rounded-xl border border-[#232a33] shadow-[0_15px_40px_rgba(0,0,0,0.6)] mx-auto mt-8 relative overflow-hidden">
                {/* Subtle top glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#2a323d] to-transparent"></div>

                <div className="mb-5 text-center">
                    <h1 className="text-[19px] font-bold text-gray-100 tracking-tight">Send a Message</h1>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">We’ll respond shortly.</p>
                </div>

                <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-3.5">

                    {/* NAME */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-bold text-gray-500 tracking-wider pl-0.5">
                            Name
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            required
                            defaultValue="Shivaguru"
                            className="bg-[#0a0c0f] border border-[#1e242c] rounded-lg text-gray-200 text-[13px]
                px-3 py-2 outline-none placeholder-gray-600 
                focus:bg-[#0f1115] focus:ring-1 focus:ring-[#00ea64] focus:border-[#00ea64]
                transition-all duration-300 shadow-inner"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-bold text-gray-500 tracking-wider pl-0.5">
                            Email
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            id="user_email"
                            required
                            defaultValue="gsshivaguru@gmail.com"
                            className="bg-[#0a0c0f] border border-[#1e242c] rounded-lg text-gray-200 text-[13px]
                px-3 py-2 outline-none placeholder-gray-600 
                focus:bg-[#0f1115] focus:ring-1 focus:ring-[#00ea64] focus:border-[#00ea64]
                transition-all duration-300 shadow-inner"
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* MESSAGE */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] uppercase font-bold text-gray-500 tracking-wider pl-0.5">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows="3"
                            required
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="bg-[#0a0c0f] border border-[#1e242c] rounded-lg text-gray-200 text-[13px]
                px-3 py-2 outline-none resize-none placeholder-gray-600
                focus:bg-[#0f1115] focus:ring-1 focus:ring-[#00ea64] focus:border-[#00ea64]
                transition-all duration-300 shadow-inner"
                            placeholder="Type your message..."
                        ></textarea>
                    </div>

                    {/* BUTTON */}
                    <div className="mt-3 flex justify-center">
                        <button
                            type="submit"
                            title="Send Message"
                            className="w-11 h-11 rounded-full bg-[#00ea64] text-[#0a0c0f] flex items-center justify-center
                shadow-[0_0_15px_rgba(0,234,100,0.25)] group
                hover:bg-[#00d85a] hover:shadow-[0_0_20px_rgba(0,234,100,0.5)]
                transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Send size={16} className="ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Status Message */}
            {status && (
                <div className={`mt-5 text-center text-xs font-semibold tracking-wide ${status.includes('successfully') ? 'text-[#00ea64]' : status.includes('Failed') ? 'text-red-500' : 'text-gray-400'}`}>
                    {status}
                </div>
            )}
        </div>
    );
}
