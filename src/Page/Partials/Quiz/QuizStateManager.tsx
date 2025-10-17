import { useState } from "react";
import { QuizMode, QuizResult } from ".";
import QuizTile from "./QuizTile";
import { type DictionaryEntry } from "../../../Context";

interface QuizProps {
  data: DictionaryEntry;
  quizModes?: QuizMode[];
}
/**
 * Show a quiz component. The component has two rows:
 * - 1. row: for each number of practices and trainings show one grid and
 * - 2. row: QuizTiles.
 *
 * If the quiz is finished show a summary with the results of each question.
 *
 * @returns A quiz component with a grid layout
 */
const Quiz = ({
  data,
  quizModes = [QuizMode.PRACTICE, QuizMode.TRAIN, QuizMode.WRITE],
}: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizIsFinished, setQuizIsFinished] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>(
    Array(quizModes.length).fill(QuizResult.PENDING)
  );

  const finishHandler = (result: QuizResult) => {
    const newResults = [...quizResults];
    newResults[currentQuestionIndex] = result;
    setQuizResults(newResults);
    // Move to next question if any
    if (currentQuestionIndex < quizModes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (currentQuestionIndex === quizModes.length - 1) {
      setQuizIsFinished(true);
    }
  };
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizIsFinished(false);
    setQuizResults(Array(quizModes.length).fill(QuizResult.PENDING));
  };

  if (quizIsFinished) {
    // All questions finished show summary
    const passedCount = quizResults.filter(
      (r) => r === QuizResult.PASSED
    ).length;
    return (
      <div className="text-center">
        <div className="text-2xl font-bold mb-2">Quiz Finished</div>
        <div className="text-lg mb-4">
          You passed {passedCount} out of {quizModes.length} questions.
        </div>
        <div className="flex gap-1 mb-4 mx-1 justify-center items-center">
          {quizResults.map((result, i) => (
            <div
              key={i}
              className={`flex items-center justify-center aspect-square w-12 sm:w-14 md:w-16 lg:w-24 outline-2 rounded transition-colors outline-transparent overflow-hidden ${
                result === QuizResult.PASSED
                  ? "bg-green-200"
                  : result === QuizResult.FAILED
                  ? "bg-red-200"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className={`flex gap-2 mb-4 mx-1 justify-center items-center`}>
        {quizModes.map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center aspect-square w-12 sm:w-14 md:w-16 lg:w-24 outline-2 rounded transition-colors overflow-hidden ${
              currentQuestionIndex === i
                ? "outline-indigo-700"
                : "outline-transparent"
            } ${
              quizResults[i] === QuizResult.PASSED
                ? "bg-green-200"
                : quizResults[i] === QuizResult.FAILED
                ? "bg-red-200"
                : "bg-gray-100"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {/* Render QuizTiles based on totalQuestions */}
      {quizModes.map((questionType, i) => {
        if (currentQuestionIndex !== i) return null;
        return (
          <QuizTile
            key={i}
            data={data} // Assuming `data` is available in this scope
            mode={questionType}
            className={"max-w-[512px]"}
            finishHandler={finishHandler}
          />
        );
      })}
    </div>
  );
};
export default Quiz;
