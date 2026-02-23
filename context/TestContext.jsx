"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { questions } from "../data/questionData";

const TestContext = createContext();

export function TestProvider({ children }) {
    // 1. Timer State
    const [timeLeft, setTimeLeft] = useState(3599);

    // 2. Initialization state (Camera / Pre-start)
    const [hasStarted, setHasStarted] = useState(false);

    // 3. Question / Editor State
    const [activeQuestionId, setActiveQuestionId] = useState(questions[0].id);
    const [editorCodes, setEditorCodes] = useState(() => {
        const initial = {};
        questions.forEach(q => {
            initial[q.id] = q.codeTemplate;
        });
        return initial;
    });

    // 4. Message State
    const [messageContent, setMessageContent] = useState("");

    // Update code for a specific question
    const updateEditorCode = (questionId, newCode) => {
        setEditorCodes(prev => ({
            ...prev,
            [questionId]: newCode
        }));
    };

    // Timer countdown effect
    useEffect(() => {
        if (!hasStarted) return;
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, hasStarted]);

    // Handle Initialization
    useEffect(() => {
        if (hasStarted) return;

        const initializeTest = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                window.activeProctorStream = stream;
            } catch (err) {
                console.warn("Camera access denied or unavailable, proceeding to test anyway.");
            } finally {
                setHasStarted(true);
            }
        };

        if (!window.hasInitializedTest) {
            window.hasInitializedTest = true;
            initializeTest();
        } else {
            setHasStarted(true);
        }
    }, [hasStarted]);

    return (
        <TestContext.Provider
            value={{
                timeLeft,
                hasStarted,
                activeQuestionId,
                setActiveQuestionId,
                editorCodes,
                updateEditorCode,
                questions,
                messageContent,
                setMessageContent
            }}
        >
            {children}
        </TestContext.Provider>
    );
}

export function useTest() {
    return useContext(TestContext);
}
