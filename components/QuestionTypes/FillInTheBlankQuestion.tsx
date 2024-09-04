import React from "react";
import ReactMarkdown from "react-markdown";

interface FillInTheBlankQuestionProps {
  question: string;
  blanks: { key: string; value: string }[];
  word_bank: string[];
  explanation: string;
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({
  question,
  blanks,
  word_bank,
  explanation,
  index,
  userAnswer = "", 
  showResults,
  handleAnswerChange,
}) => {
  const userAnswers = userAnswer.split(",").map((ans) => ans.trimStart().trimEnd());

  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>

      {blanks.map((blank, i) => {
        const answer = userAnswers[i] || ""; 
        const correctAnswer = word_bank[i]; 
        const isCorrect = showResults && answer === correctAnswer; 
        const isIncorrect = showResults && answer && answer !== correctAnswer; 

        return (
          <div key={i} className="mt-2">
            <input
              type="text"
              placeholder={`Fill blank ${i + 1}`}
              className={`p-2 w-full border ${
                isCorrect ? "border-green-500" : isIncorrect ? "border-red-500" : "border-gray-300"
              } dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
              value={answer}
              onChange={(e) => {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[i] = e.target.value;
                handleAnswerChange(index, updatedAnswers.join(","));
              }}
              disabled={showResults}
            />
            {isIncorrect && showResults && (
              <p className="text-sm text-red-500 dark:text-red-400">
                Incorrect! Correct answer: {correctAnswer}
              </p>
            )}
          </div>
        );
      })}

      {showResults && (
        <>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            <strong>Correct Answers:</strong> {word_bank.join(", ")}
          </p>
          <p className="mt-2 text-sm font-bold text-gray-700 dark:text-gray-300">
            <strong>Explanation:</strong> 
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </p>
        </>
      )}

      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <strong>Available Words:</strong> {blanks.map((blank) => blank.value).join(", ")}
      </p>
    </div>
  );
};

export default FillInTheBlankQuestion;
