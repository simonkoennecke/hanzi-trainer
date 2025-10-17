import DictionaryCard from "./Partials/DictionaryCard";
import { useDictionaryContext } from "../Context";
import { useMemo } from "react";
import { useParams } from "react-router";

function TrainingsSet() {
  const { getEntry } = useDictionaryContext()!;
  const { trainingsId } = useParams();
  const { loadTrainingSet } = useDictionaryContext()!;
  const training = useMemo(
    () => loadTrainingSet(trainingsId!)!,
    [trainingsId, loadTrainingSet]
  );
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Training Set: {training.title} {training.source && (
        <span className="mb-8 text-gray-600 text-sm color-gray-500">
          (<a href={training.source}>🔗</a>)
        </span>
      )}
      </h1>
      <div className="mb-8 text-gray-700">{training.description}</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {training.entries
          .map(getEntry)
          .filter((e) => e !== null)
          .map((entry) => (
            <DictionaryCard key={entry.character} dictionaryEntry={entry} />
          ))}
      </div>
    </div>
  );
}

export default TrainingsSet;
