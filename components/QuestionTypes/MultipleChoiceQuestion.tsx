import React from "react";
import ReactMarkdown from "react-markdown"; 

interface MultipleChoiceQuestionProps {
  question: string;
  choices: { key: string; value: string }[];
  answer: string;
  explanation: string;
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  choices,
  answer,
  explanation,
  index,
  userAnswer,
  showResults,
  handleAnswerChange,
}) => {
  const isCorrect = showResults && userAnswer === answer; 

  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>
      {choices.map((choice) => (
        <div key={choice.key} className="flex items-center mb-2">
          <input
            type="radio"
            id={`question-${index}-choice-${choice.key}`}
            name={`question-${index}`}
            value={choice.key}
            checked={userAnswer === choice.key}
            onChange={() => handleAnswerChange(index, choice.key)}
            disabled={showResults}
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`question-${index}-choice-${choice.key}`}
            className={`ml-2 ${
              showResults
                ? choice.key === answer
                  ? "text-green-600 dark:text-green-400" 
                  : "text-gray-700 dark:text-gray-300"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {choice.value}
          </label>
        </div>
      ))}
      {showResults && (
        <>
          <p
            className={`mt-2 text-sm ${
              isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
            }`}
          >
            <strong>{isCorrect ? "Correct!" : "Incorrect!"}</strong> The correct answer is: {answer}
          </p>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>Explanation:</strong>
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
