import React from "react";
import ReactMarkdown from "react-markdown"; 

interface TrueFalseQuestionProps {
  question: string;
  answer: boolean;
  explanation: string;
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  answer,
  explanation,
  index,
  userAnswer,
  showResults,
  handleAnswerChange,
}) => {
  const isCorrect = showResults && userAnswer.toLowerCase() === answer.toString(); // Evalúa si la respuesta es correcta

  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>
      <div className="flex space-x-4 mt-2">
        <label className="flex items-center text-white">
          <input
            type="radio"
            name={`question-${index}`}
            value="true"
            checked={userAnswer === "true"}
            onChange={() => handleAnswerChange(index, "true")}
            disabled={showResults}
            className="mr-2"
          />
          True
        </label>
        <label className="flex items-center text-white">
          <input
            type="radio"
            name={`question-${index}`}
            value="false"
            checked={userAnswer === "false"}
            onChange={() => handleAnswerChange(index, "false")}
            disabled={showResults}
            className="mr-2"
          />
          False
        </label>
      </div>
      {showResults && (
        <>
          <p className={`mt-2 text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
            <strong>{isCorrect ? "Correct!" : "Incorrect!"}</strong> The correct answer is: {answer ? "True" : "False"}
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

export default TrueFalseQuestion;
