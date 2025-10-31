import { useMemo, useState } from "react";
import type { TrainingComponentProps } from ".";
import type { DictionaryBaseEntry } from "../../../Context";

interface PinyinProps extends TrainingComponentProps {}

function Pinyin({ instance, index, total, onAnswer }: PinyinProps) {
  const [selectedAnswer, setSelectedAnswer] =
    useState<DictionaryBaseEntry | null>(null);
  // shuffle answers
  const answers = useMemo(
    () =>
      [instance.question, ...instance.answers].sort(() => Math.random() - 0.5),
    [instance.question, instance.answers]
  );

  const isCharToPinyin = instance.type === "char_to_pinyin";

  const handleAnswer = (answer: DictionaryBaseEntry) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer.character === instance.question.character);
    }, 1000);
  };

  return (
    <>
      <div className="mb-4">
        <div className="text-xl mb-2">
          Question {index + 1} of {total}
        </div>
        <div
          className={
            "text-4xl font-bold mb-4 text-center " +
            (isCharToPinyin ? "text-8xl" : "text-2xl")
          }
        >
          {isCharToPinyin
            ? instance.question.character
            : instance.question.pinyin.join(", ")}{" "}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {answers.map((answer) => (
            <button
              key={answer.pinyin.join(", ")}
              className={
                "p-4 bg-gray-200 rounded transition-colors " +
                (isCharToPinyin ? "text-4xl" : "text-xl") +
                " " +
                (selectedAnswer
                  ? answer.character === instance.question.character
                    ? "bg-green-400 text-white"
                    : answer.character === selectedAnswer.character
                    ? "bg-red-400 text-white"
                    : ""
                  : "hover:bg-gray-300")
              }
              onClick={() => handleAnswer(answer)}
            >
              {isCharToPinyin ? answer.pinyin.join(", ") : answer.character}{" "}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pinyin;
