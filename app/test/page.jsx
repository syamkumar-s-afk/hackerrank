"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QuestionPanel from "../../components/QuestionPanel";
import EditorPanel from "../../components/EditorPanel";
import Footer from "../../components/Footer";
import { questions } from "../../data/questionData";

export default function TestPage() {
    const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id);

    const activeQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];

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
