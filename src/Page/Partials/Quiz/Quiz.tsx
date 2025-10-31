import { useMemo, useState } from "react";
import { QuizMode, QuizResult } from ".";
import { useDictionaryContext, type DictionaryEntry } from "../../../Context";
import { simplifyWithRDP, type Point } from "../../../Geometry";
import QuizStateManager from "./QuizStateManager";
import QuizTile from "./QuizTile";

interface QuizProps {
  char?: string;
  quizModes?: QuizMode[];
  onAnswer?: (result: QuizResult) => void;
}
/**
 * Show a quiz component two rows. 1 row for each number of practices and trainings show one grid. Row 2 show QuizTiles.
 *
 * @returns A quiz component with a grid layout
 */
const Quiz = ({
  char,
  quizModes = [QuizMode.PRACTICE, QuizMode.TRAIN, QuizMode.WRITE],
  onAnswer,
}: QuizProps) => {
  const { getEntry } = useDictionaryContext()!;

  const [data, setData] = useState(null as DictionaryEntry | null);
  const [error, setError] = useState(null as string | null);

  useMemo(() => {
    if (!char) return;
    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
      .then((response) => response.json())
      .then((data) =>
        setData({
          ...getEntry(char),
          ...data,
          medians: data.medians.map((median: Point[]) =>
            simplifyWithRDP(median, 15)
          ),
        })
      )
      .catch(() => setError(`Character data for "${char}" not found.`));
  }, [char, getEntry]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!data) {
    return <div>Loading character data...</div>;
  }
  if (quizModes.length === 1) {
    return (
      <QuizTile
        data={data}
        mode={quizModes[0]}
        className="w-full md:w-[512px]"
        finishHandler={(result) => {
          if (onAnswer) {
            onAnswer(result);
          }
        }}
      />
    );
  }
  return <QuizStateManager data={data} quizModes={quizModes} />;
};
export default Quiz;
