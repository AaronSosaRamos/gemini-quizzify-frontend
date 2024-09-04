import React from "react";
import ReactMarkdown from "react-markdown";

interface RelateConceptsQuestionProps {
  question: string;
  pairs: { term: string; meaning: string }[];
  answer: { term: string; meaning: string }[];
  explanation: string;
  index: number;
  userAnswer: string;
  showResults: boolean;
  handleAnswerChange: (index: number, answer: string) => void;
}

const RelateConceptsQuestion: React.FC<RelateConceptsQuestionProps> = ({
  question,
  pairs,
  answer,
  explanation,
  index,
  userAnswer = "",
  showResults,
  handleAnswerChange,
}) => {
  const userAnswers = userAnswer.split(",").map((ans) => ans.trim());

  const isCorrect = (term: string, meaning: string) => {
    const correctPair = answer.find((a) => a.term === term);
    return correctPair && correctPair.meaning.toLowerCase() === meaning.toLowerCase();
  };

  const allMeanings = Array.from(new Set(pairs.map((pair) => pair.meaning)));

  return (
    <div className="mb-6">
      <p className="text-lg font-medium text-gray-900 dark:text-white">{question}</p>
      {pairs.map((pair, i) => {
        const userMeaning = userAnswers[i] || ""; 
        const correct = isCorrect(pair.term, userMeaning);
        const incorrect = showResults && !correct;

        return (
          <div key={i} className="mb-2">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{pair.term}</p>
            <select
              value={userMeaning}
              onChange={(e) => {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[i] = e.target.value;
                handleAnswerChange(index, updatedAnswers.join(","));
              }}
              disabled={showResults}
              className={`mt-1 p-2 w-full border ${
                showResults ? (correct ? "border-green-500" : "border-red-500") : "border-gray-300"
              } dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white`}
            >
              <option value="">Select a meaning</option>
              {allMeanings.map((meaning, j) => (
                <option key={j} value={meaning}>
                  {meaning}
                </option>
              ))}
            </select>
            {incorrect && (
              <p className="text-sm text-red-500 dark:text-red-400">
                Incorrect! Correct meaning for "{pair.term}" is: {answer.find((a) => a.term === pair.term)?.meaning}
              </p>
            )}
          </div>
        );
      })}
      {showResults && (
        <>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
            <strong>Correct Answers:</strong>
            <ul className="list-disc list-inside">
              {answer.map((a, i) => (
                <li key={i}>
                  {a.term} - {a.meaning}
                </li>
              ))}
            </ul>
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

export default RelateConceptsQuestion;
