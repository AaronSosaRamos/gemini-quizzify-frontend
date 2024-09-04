import React from "react";
import ReactMarkdown from "react-markdown";

interface OpenEndedQuestionProps {
  question: string;
  answer: string;
  feedback: string[];
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const OpenEndedQuestion: React.FC<OpenEndedQuestionProps> = ({
  question,
  answer,
  feedback = [], 
  index,
  userAnswer,
  showResults,
  handleAnswerChange,
}) => {
  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>
      <textarea
        className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        value={userAnswer} 
        onChange={(e) => handleAnswerChange(index, e.target.value)}
        disabled={showResults}
      />
      {showResults && (
        <>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
            <strong>Correct Answer:</strong>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>Feedback:</strong>
            <ul className="list-disc list-inside">
              {feedback.map((item, i) => (
                <li key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default OpenEndedQuestion;
