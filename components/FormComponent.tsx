"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleSpinner from "./Spinner";

const formSchema = z.object({
    topic: z.string().min(1, "Topic is required"),
    n_questions: z
        .number({ invalid_type_error: "Number of questions must be a number" })
        .min(1, "Must be at least 1 question")
        .max(10, "Cannot exceed 10 questions"),
    file_url: z.string().url("Must be a valid URL"),
    file_type: z.enum([
        "pdf",
        "csv",
        "txt",
        "md",
        "url",
        "pptx",
        "docx",
        "xls",
        "xlsx",
        "xml",
        "gdoc",
        "gsheet",
        "gslide",
        "gpdf",
        "img",
        "youtube_url",
    ]),
    language: z.enum(["en", "es", "fr", "de", "it"]),
});

type FormData = z.infer<typeof formSchema>;

type Question = {
    question: string;
    choices: { key: string; value: string }[];
    answer: string;
    explanation: string;
};

export default function FormComponent() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [showQuestions, setShowQuestions] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        console.log("Form Data Submitted:", data);
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate-quizzes`,
                data,
                {
                    headers: {
                        "api-key": "production",
                    },
                }
            );

            setQuestions(response.data);
            setShowQuestions(true);
            setShowResults(false);
            setLoading(false);

            toast.success("Form submitted successfully! Generating questions...", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            reset();
        } catch (error) {
            setLoading(false);
            toast.error(
                "An error occurred while generating questions. Please try again.",
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
            console.error("Error generating questions:", error);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: string) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer,
        }));
    };

    const handleQuizSubmit = () => {
        setShowResults(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-md mb-6"
            >
                <div className="mb-4">
                    <label
                        htmlFor="topic"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Topic
                    </label>
                    <input
                        id="topic"
                        type="text"
                        {...register("topic")}
                        className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.topic && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.topic.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="n_questions"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Number of Questions
                    </label>
                    <input
                        id="n_questions"
                        type="number"
                        {...register("n_questions", { valueAsNumber: true })}
                        className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.n_questions && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.n_questions.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="file_url"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        File URL
                    </label>
                    <input
                        id="file_url"
                        type="url"
                        {...register("file_url")}
                        className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.file_url && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.file_url.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="file_type"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        File Type
                    </label>
                    <select
                        id="file_type"
                        {...register("file_type")}
                        className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Select file type</option>
                        {[
                            "pdf",
                            "csv",
                            "txt",
                            "md",
                            "url",
                            "pptx",
                            "docx",
                            "xls",
                            "xlsx",
                            "xml",
                            "gdoc",
                            "gsheet",
                            "gslide",
                            "gpdf",
                            "img",
                            "youtube_url",
                        ].map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.file_type && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.file_type.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Language
                    </label>
                    <select
                        id="language"
                        {...register("language")}
                        className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                    </select>
                    {errors.language && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.language.message}
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? <CircleSpinner /> : "Submit"}
                    </button>
                </div>
            </form>

            {showQuestions && (
                <div className="max-w-2xl w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
                    <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                        Generated Questions
                    </h2>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-6">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {index + 1}. {question.question}
                            </p>
                            <div className="mt-2">
                                {question.choices.map((choice) => (
                                    <div key={choice.key} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-choice-${choice.key}`}
                                            name={`question-${index}`}
                                            value={choice.key}
                                            onChange={() => handleAnswerChange(index, choice.key)}
                                            disabled={showResults}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor={`question-${index}-choice-${choice.key}`}
                                            className="ml-2 text-gray-700 dark:text-gray-300"
                                        >
                                            {choice.value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {showResults && (
                                <div
                                    className={`mt-2 text-sm ${userAnswers[index] === question.answer
                                            ? "text-green-500 dark:text-green-400"
                                            : "text-red-500 dark:text-red-400"
                                        }`}
                                >
                                    {userAnswers[index] === question.answer
                                        ? "Correct!"
                                        : `Incorrect! The correct answer is ${question.answer}.`}
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {question.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                    {!showResults && (
                        <button
                            onClick={handleQuizSubmit}
                            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Submit Answers
                        </button>
                    )}
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
