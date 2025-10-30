import { useMemo, useState } from "react";
import type { TrainingComponentProps } from ".";
import type { DictionaryBaseEntry } from "../../../Context";

interface MeaningProps extends TrainingComponentProps {}

function Meaning({ instance, index, total, onAnswer }: MeaningProps) {
  const [selectedAnswer, setSelectedAnswer] =
    useState<DictionaryBaseEntry | null>(null);
  // shuffle answers
  const answers = useMemo(
    () =>
      [instance.question, ...instance.answers].sort(() => Math.random() - 0.5),
    [instance.question, instance.answers]
  );
  const isCharToMeaning = instance.type === "char_to_meaning";

  const handleAnswer = (answer: DictionaryBaseEntry) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer.character === instance.question.character);
    }, 1000);
  };

  return (
    <div className="mb-4">
      <div className="text-xl mb-2">
        Question {index + 1} of {total}
      </div>
      <div
        className={
          "font-bold mb-4 text-center " +
          (isCharToMeaning ? "text-2xl" : "text-8xl")
        }
      >
        {isCharToMeaning
          ? instance.question.definition
          : instance.question.character}{" "}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer) => (
          <button
            key={answer.definition}
            className={
              "p-4 bg-gray-200 rounded transition-colors " +
              (isCharToMeaning ? "text-4xl" : "text-xl") +
              " " +
              (selectedAnswer
                ? answer.character === instance.question.character
                  ? "bg-green-400 text-white"
                  : answer.character === selectedAnswer.character
                  ? "bg-red-400 text-white"
                  : ""
                : "hover:bg-gray-300 ")
            }
            onClick={() => handleAnswer(answer)}
          >
            {isCharToMeaning ? answer.character : answer.definition}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Meaning;
