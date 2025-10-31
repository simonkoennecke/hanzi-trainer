import { useDictionaryContext } from "../Context";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import GenerateTrainingSet from "./Partials/Training/Generator";
import type { TrainingInstanceState, TrainingType } from "./Partials/Training";
import Meaning from "./Partials/Training/Meaning";
import Writing from "./Partials/Training/Writing";
import Pinyin from "./Partials/Training/Pinyin";
import Speak from "./Partials/Training/Speak";

function Training() {
  const { trainingsId } = useParams();
  const { loadTrainingSet, dictionary, appConfiguration } =
    useDictionaryContext()!;
  const trainingSet = useMemo(
    () => loadTrainingSet(trainingsId!)!,
    [trainingsId, loadTrainingSet]
  );
  const trainingInstances = useMemo(
    () =>
      GenerateTrainingSet(
        dictionary,
        trainingSet,
        appConfiguration.numberOfQuestions,
        (
          Object.keys(appConfiguration.allowTrainingsModes) as TrainingType[]
        ).filter((mode) => appConfiguration.allowTrainingsModes[mode])
      ),
    [dictionary, trainingSet]
  );

  const [trainingInstanceState, setTrainingInstanceState] = useState<
    TrainingInstanceState[]
  >(
    trainingInstances.map(() => ({
      status: "pending",
    }))
  );
  const [index, setIndex] = useState(0);
  const trainingInstance = trainingInstances[index];

  const onAnswer = (isCorrect: boolean) => {
    setTrainingInstanceState((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        status: isCorrect ? "correct" : "incorrect",
      };
      return newState;
    });
    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">Training {trainingSet.title}</h1>
      {/* Box indicates  instances  status*/}

      <div className="flex gap-1 mb-4 mx-1 justify-center items-center">
        {trainingInstanceState.map((result, i) => (
          <div
            key={i}
            className={`flex items-center justify-center aspect-square w-12 sm:w-14 md:w-16 lg:w-24 outline-2 rounded transition-colors outline-transparent overflow-hidden ${
              result.status === "correct"
                ? "bg-green-200"
                : result.status === "incorrect"
                ? "bg-red-200"
                : "bg-gray-100"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {index >= trainingInstances.length ? (
        <>
          <div className="text-center text-gray-700 p-4">
            Training completed!
          </div>
          <div className="text-center text-gray-700 p-4">
            You answered{" "}
            {
              trainingInstanceState.filter(
                (state) => state.status === "correct"
              ).length
            }{" "}
            out of {trainingInstances.length} correctly.
          </div>
          <div className="text-center text-gray-700 p-4">
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={() => {
                setTrainingInstanceState(
                  trainingInstances.map(() => ({ status: "pending" }))
                );
                setIndex(0);
              }}
            >
              Redo the training
            </button>
            <button
              className="ml-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              onClick={() => {
                window.location.reload();
              }}
            >
              Start new questions
            </button>
          </div>
        </>
      ) : trainingInstance.type === "char_to_meaning" ||
        trainingInstance.type === "meaning_to_char" ? (
        <Meaning
          key={index}
          instance={trainingInstance}
          index={index}
          total={trainingInstances.length}
          onAnswer={onAnswer}
        />
      ) : trainingInstance.type === "char_to_pinyin" ||
        trainingInstance.type === "pinyin_to_char" ? (
        <Pinyin
          key={index}
          instance={trainingInstance}
          index={index}
          total={trainingInstances.length}
          onAnswer={onAnswer}
        />
      ) : trainingInstance.type === "writing" ? (
        <Writing
          key={index}
          instance={trainingInstance}
          index={index}
          total={trainingInstances.length}
          onAnswer={onAnswer}
        />
      ) : trainingInstance.type === "speak" ? (
        <Speak
          key={index}
          instance={trainingInstance}
          index={index}
          total={trainingInstances.length}
          onAnswer={onAnswer}
        />
      ) : null}
    </div>
  );
}

export default Training;
