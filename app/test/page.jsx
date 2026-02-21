"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QuestionPanel from "../../components/QuestionPanel";
import EditorPanel from "../../components/EditorPanel";
import Footer from "../../components/Footer";
import { questions } from "../../data/questionData";

export default function TestPage() {
    const [hasStarted, setHasStarted] = useState(false);
    const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id);

    const handleStartTest = async () => {
        try {
            // Request camera access. The stream is kept alive in memory so the browser 
            // shows the active recording icon, but no data is actually recorded or uploaded.
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            // Store the stream globally or in window so it doesn't get garbage collected immediately
            window.activeProctorStream = stream;
        } catch (err) {
            // Ignore camera failures because the user explicitly requested avoiding hard blocks
            console.warn("Camera access denied or unavailable, proceeding to test anyway.");
        } finally {
            // Unconditionally allow the user into the test
            setHasStarted(true);
        }
    };

    const activeQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];

    // Pre-start screen
    if (!hasStarted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full bg-[#0d1117] text-white">
                <div className="max-w-md w-full p-8 border border-[#2a323d] bg-[#161b22] rounded-lg shadow-xl text-center">
                    <h1 className="text-2xl font-bold mb-4">HackerRank Assessment</h1>
                    <p className="text-gray-400 mb-8 text-sm">
                        Welcome to your technical assessment. Once you begin, your timer will start immediately.
                        Good luck!
                    </p>

                    <button
                        onClick={handleStartTest}
                        className="bg-[#22c55e] hover:bg-[#1ea850] text-[#0d1117] font-bold py-2.5 px-6 rounded transition-colors w-full"
                    >
                        Start Test
                    </button>
                </div>
            </div>
        );
    }

    // Actual Test UI
    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-[#0f141e] text-[#39424e] dark:text-white overflow-hidden transition-colors">
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    questions={questions}
                    activeId={activeQuestionId}
                    onSelect={setActiveQuestionId}
                />
                <QuestionPanel question={activeQuestion} />
                <EditorPanel question={activeQuestion} />
                <Footer />
            </div>
        </div>
    );
}
