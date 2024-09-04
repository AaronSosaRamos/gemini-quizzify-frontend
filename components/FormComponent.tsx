"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleSpinner from "./Spinner";

import { openEndedQuestions } from "../components/MockQuestions/OpenEndedQuestions";
import { fillInTheBlankQuestions } from "../components/MockQuestions/FillInTheBlankQuestions";
import { trueFalseQuestions } from "../components/MockQuestions/TrueFalseQuestions";
import { multipleChoiceQuestions } from "../components/MockQuestions/MultipleChoiceQuestions";
import { relateConceptsQuestions } from "../components/MockQuestions/RelateConceptsQuestions";
import { mathExerciseQuestions } from "../components/MockQuestions/MathExerciseQuestions";

import OpenEndedQuestion from "../components/QuestionTypes/OpenEndedQuestion";
import FillInTheBlankQuestion from "../components/QuestionTypes/FillInTheBlankQuestion";
import TrueFalseQuestion from "../components/QuestionTypes/TrueFalseQuestion";
import MultipleChoiceQuestion from "../components/QuestionTypes/MultipleChoiceQuestion";
import RelateConceptsQuestion from "../components/QuestionTypes/RelateConceptsQuestion";
import MathExerciseQuestion from "../components/QuestionTypes/MathExerciseQuestion";
import axios from "axios";

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
  question_type: z.enum([
    "fill_in_the_blank",
    "open_ended",
    "true_false",
    "multiple_choice",
    "relate_concepts",
    "math_exercises",
  ]),
});

type FormData = z.infer<typeof formSchema>;

interface OpenEndedQuestion {
  question: string;
  answer: string;
  feedback: string[];
}

interface FillInTheBlankQuestion {
  question: string;
  blanks: { key: string; value: string }[];
  word_bank: string[];
  explanation: string;
}

interface TrueFalseQuestion {
  question: string;
  answer: boolean;
  explanation: string;
}

interface MultipleChoiceQuestion {
  question: string;
  choices: { key: string; value: string }[];
  answer: string;
  explanation: string;
}

interface RelateConceptsQuestion {
  question: string;
  pairs: { term: string; meaning: string }[];
  answer: { term: string; meaning: string }[];
  explanation: string;
}

interface MathExerciseQuestion {
  question: string;
  solution: string;
  correct_answer: string;
  explanation: string;
}

type Question =
  | OpenEndedQuestion
  | FillInTheBlankQuestion
  | TrueFalseQuestion
  | MultipleChoiceQuestion
  | RelateConceptsQuestion
  | MathExerciseQuestion;

const getQuestionsByType = (type: string): Question[] => {
  switch (type) {
    case "open_ended":
      return openEndedQuestions;
    case "fill_in_the_blank":
      return fillInTheBlankQuestions;
    case "true_false":
      return trueFalseQuestions;
    case "multiple_choice":
      return multipleChoiceQuestions;
    case "relate_concepts":
      return relateConceptsQuestions;
    case "math_exercises":
      return mathExerciseQuestions;
    default:
      return [];
  }
};

export default function MockedFormComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState<string>("");

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
    setQuestionType(data.question_type);
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

  const renderQuestion = (question: Question, index: number) => {
    switch (questionType) {
      case "open_ended":
        const openEndedQ = question as OpenEndedQuestion;
        return (
          <OpenEndedQuestion
            question={openEndedQ.question}
            answer={openEndedQ.answer}
            feedback={openEndedQ.feedback}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "fill_in_the_blank":
        const fillInBlankQ = question as FillInTheBlankQuestion;
        return (
          <FillInTheBlankQuestion
            question={fillInBlankQ.question}
            blanks={fillInBlankQ.blanks}
            word_bank={fillInBlankQ.word_bank}
            explanation={fillInBlankQ.explanation}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "true_false":
        const trueFalseQ = question as TrueFalseQuestion;
        return (
          <TrueFalseQuestion
            question={trueFalseQ.question}
            answer={trueFalseQ.answer}
            explanation={trueFalseQ.explanation}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "multiple_choice":
        const multipleChoiceQ = question as MultipleChoiceQuestion;
        return (
          <MultipleChoiceQuestion
            question={multipleChoiceQ.question}
            choices={multipleChoiceQ.choices}
            answer={multipleChoiceQ.answer}
            explanation={multipleChoiceQ.explanation}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "relate_concepts":
        const relateConceptsQ = question as RelateConceptsQuestion;
        return (
          <RelateConceptsQuestion
            question={relateConceptsQ.question}
            pairs={relateConceptsQ.pairs}
            answer={relateConceptsQ.answer}
            explanation={relateConceptsQ.explanation}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "math_exercises":
        const mathExerciseQ = question as MathExerciseQuestion;
        return (
          <MathExerciseQuestion
            question={mathExerciseQ.question}
            solution={mathExerciseQ.solution}
            correct_answer={mathExerciseQ.correct_answer}
            explanation={mathExerciseQ.explanation}
            index={index}
            userAnswer={userAnswers[index]}
            showResults={showResults}
            handleAnswerChange={handleAnswerChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-md mb-6">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <input
            id="topic"
            type="text"
            {...register("topic")}
            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.topic && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.topic.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="n_questions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Questions
          </label>
          <input
            id="n_questions"
            type="number"
            {...register("n_questions", { valueAsNumber: true })}
            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.n_questions && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.n_questions.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="file_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            File URL
          </label>
          <input
            id="file_url"
            type="url"
            {...register("file_url")}
            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.file_url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.file_url.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="file_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            File Type
          </label>
          <select
            id="file_type"
            {...register("file_type")}
            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select file type</option>
            {[
              "pdf", "csv", "txt", "md", "url", "pptx", "docx", "xls", "xlsx", "xml",
              "gdoc", "gsheet", "gslide", "gpdf", "img", "youtube_url",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.file_type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.file_type.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          {errors.language && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.language.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="question_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Question Type
          </label>
          <select
            id="question_type"
            {...register("question_type")}
            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select question type</option>
            <option value="fill_in_the_blank">Fill in the Blank</option>
            <option value="open_ended">Open Ended</option>
            <option value="true_false">True/False</option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="relate_concepts">Relate Concepts</option>
            <option value="math_exercises">Math Exercises</option>
          </select>
          {errors.question_type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.question_type.message}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <CircleSpinner /> : "Submit"}
          </button>
        </div>
      </form>

      {showQuestions && (
        <div className="max-w-2xl w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">Generated Questions</h2>
          {questions.map((question, index) => renderQuestion(question, index))}
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
