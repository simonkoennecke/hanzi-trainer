import { QuizMode } from "../Quiz";
import QuizModeSelect from "./QuizModeSelect";

interface TrainingRoundsProps {
  quizModes: QuizMode[];
  setValue: (name: string, value: any) => void;
  swapQuizMode: (index1: number, index2: number) => void;
  removeQuizMode: (index: number) => void;
  addQuizMode: (mode: QuizMode) => void;
  newQuizModeRef: React.RefObject<HTMLSelectElement>;
  watch: (name: string) => any;
}

const TrainingRounds: React.FC<TrainingRoundsProps> = ({
  quizModes,
  setValue,
  swapQuizMode,
  removeQuizMode,
  addQuizMode,
  newQuizModeRef,
  watch,
}) => (
  <div className="mb-6 items-center">
    <label className="block text-gray-700 font-medium mr-4 w-32 font-extrabold">
      Training Rounds
    </label>
    <div>
      <div className="flex space-x-8">
        <div className="flex-1">
          <div>
            {quizModes.map((mode, i) => (
              <div
                key={mode + "_" + i}
                className="grid grid-cols-[auto_1fr_auto] gap-4"
              >
                <div className="my-2 w-20">Round {i + 1}: </div>
                <QuizModeSelect
                  value={mode}
                  onChange={(mode) =>
                    setValue(`quizMode.${i}` as const, mode as QuizMode)
                  }
                />
                <div className="flex items-center">
                  <button
                    onClick={() => swapQuizMode(i, i - 1)}
                    disabled={i === 0}
                    hidden={watch("quizMode").length === 1}
                    className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => swapQuizMode(i, i + 1)}
                    disabled={i === watch("quizMode").length - 1}
                    hidden={watch("quizMode").length === 1}
                    className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    hidden={watch("quizMode").length === 1}
                    onClick={() => removeQuizMode(i)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            Add another Round:{" "}
            <select
              ref={newQuizModeRef}
              className="border border-gray-300 rounded px-3 py-1 mr-2"
            >
              <option value={QuizMode.PRACTICE}>Practice</option>
              <option value={QuizMode.TRAIN}>Train</option>
              <option value={QuizMode.WRITE}>Write</option>
            </select>
            <button
              type="button"
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                addQuizMode(newQuizModeRef.current!.value as QuizMode);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TrainingRounds;
