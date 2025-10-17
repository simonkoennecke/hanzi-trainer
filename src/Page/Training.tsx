import DictionaryCard from "./Partials/DictionaryCard";
import { useDictionaryContext } from "../Context";
import { useMemo } from "react";
import { useParams } from "react-router";

function Training() {
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
        Training Set: {training.title}
      </h1>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

export default Training;
