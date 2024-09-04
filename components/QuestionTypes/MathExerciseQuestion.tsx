import React from "react";
import ReactMarkdown from "react-markdown"; 

interface MathExerciseQuestionProps {
  question: string;
  solution: string;
  correct_answer: string;
  explanation: string;
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const MathExerciseQuestion: React.FC<MathExerciseQuestionProps> = ({
  question,
  solution,
  correct_answer,
  explanation,
  index,
  userAnswer = "", 
  showResults,
  handleAnswerChange,
}) => {
  const isCorrect = showResults && userAnswer.trim() === correct_answer.trim();

  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>
      <input
        type="text"
        placeholder="Type your answer"
        value={userAnswer}
        className={`mt-2 p-2 w-full border ${
          showResults ? (isCorrect ? "border-green-500" : "border-red-500") : "border-gray-300"
        } dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
        onChange={(e) => handleAnswerChange(index, e.target.value)}
        disabled={showResults}
      />
      {showResults && (
        <>
          <p
            className={`mt-2 text-sm ${
              isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
            }`}
          >
            <strong>{isCorrect ? "Correct!" : "Incorrect!"}</strong> The correct answer is: {correct_answer}
          </p>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>Solution:</strong> {solution}
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>Explanation:</strong>
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default MathExerciseQuestion;
