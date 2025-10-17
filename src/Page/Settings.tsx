import { useRef, useState } from "react";
import { useDictionaryContext, type AppConfiguration } from "../Context";
import { useForm } from "react-hook-form";
import { QuizMode } from "./Partials/Quiz";
import defaultAppConfiguration from "../Context/AppConfigurationDefault";

function Settings() {
  const { appConfiguration, setAppConfiguration } = useDictionaryContext()!;
  const newQuizModeRef = useRef<HTMLSelectElement>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [fade, setFade] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: appConfiguration,
  });

  const quizModes = watch("quizMode");

  const addQuizMode = (mode: QuizMode) => {
    setValue("quizMode", [...quizModes, mode]);
  };

  const swapQuizMode = (index1: number, index2: number) => {
    if (
      index1 < 0 ||
      index2 < 0 ||
      index1 >= quizModes.length ||
      index2 >= quizModes.length
    ) {
      return;
    }
    const newQuizModes = [...quizModes];
    const temp = newQuizModes[index1];
    newQuizModes[index1] = newQuizModes[index2];
    newQuizModes[index2] = temp;
    setValue("quizMode", newQuizModes);
  };

  const removeQuizMode = (index: number) => {
    setValue(
      "quizMode",
      quizModes.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: AppConfiguration) => {
    setAppConfiguration(data);
    setIsSaved(true);
    setTimeout(() => setFade(true), 500);
    setTimeout(() => {
      setIsSaved(false);
      setFade(false);
    }, 1200);
  };

  return (
    <div className="">
      {isSaved && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 opacity-100 transition-opacity duration-1000"
          style={{ opacity: fade ? 0 : 1 }}
        >
          Settings saved successfully!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg py-2 mx-auto"
      >
        <div className="mb-6 items-center">
          <label className="block text-gray-700 font-medium mr-4 w-32 font-extrabold">
            Training Rounds
          </label>
          <div>
            <div className="flex space-x-8">
              <div className="flex-1">
                <ol>
                  {quizModes.map((mode, i) => (
                    <li key={mode + "_" + i} className="my-2">
                      Round {i + 1}:{" "}
                      <select
                        {...register(`quizMode.${i}` as const)}
                        className={"border border-gray-300 rounded px-3 py-1"}
                      >
                        <option
                          value={QuizMode.PRACTICE}
                          defaultChecked={mode === QuizMode.PRACTICE}
                        >
                          Practice
                        </option>
                        <option
                          value={QuizMode.TRAIN}
                          defaultChecked={mode === QuizMode.TRAIN}
                        >
                          Train
                        </option>
                        <option
                          value={QuizMode.WRITE}
                          defaultChecked={mode === QuizMode.WRITE}
                        >
                          Write
                        </option>
                      </select>
                      <button
                        onClick={() => swapQuizMode(i, i - 1)}
                        disabled={i === 0}
                        hidden={watch("quizMode").length === 1}
                        className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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
                          className="h-4 w-4"
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
                          className="h-4 w-4"
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
                    </li>
                  ))}
                  <li>
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
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 my-4">
            <p>
              <strong>Practice:</strong> The character is displayed, and you are
              prompted to draw it. This mode provides guidance and is ideal for
              familiarization and warm-up.
              <br />
              <strong>Train:</strong> You must draw each stroke in the correct
              order. If a mistake is made, you can try again. After three
              incorrect attempts, a hint will be provided to assist you. This
              mode helps reinforce stroke order and accuracy.
              <br />
              <strong>Write:</strong> You are asked to write the character
              independently, without any hints or guidance. After completion,
              your result is shown and evaluated, with emphasis on correct
              stroke order. This mode is designed for testing your mastery.
            </p>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 font-medium mr-4 w-32">
            Brush Color
          </label>
          <input
            type="color"
            {...register("brushColor")}
            className="border border-gray-300 rounded w-12 h-12 cursor-pointer"
          />
        </div>
        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 font-medium mr-4 w-32">
            Brush Width
          </label>
          <input
            type="range"
            {...register("brushWidth", { valueAsNumber: true })}
            className="w-full accent-blue-500"
            min={1}
            max={60}
          />
          <span className="ml-4 text-gray-600 font-mono">
            {watch("brushWidth")}
          </span>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            {...register("showGrid")}
            className="mr-3 accent-blue-500"
            id="showGrid"
          />
          <label htmlFor="showGrid" className="text-gray-700 font-medium">
            Show Grid
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            {...register("showMedianLines")}
            className="mr-3 accent-blue-500"
            id="showMedianLines"
          />
          <label
            htmlFor="showMedianLines"
            className="text-gray-700 font-medium"
          >
            Show Median Lines
          </label>
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            {...register("showDebug")}
            className="mr-3 accent-blue-500"
            id="showDebug"
          />
          <label htmlFor="showDebug" className="text-gray-700 font-medium">
            Show Debug Information
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition-colors"
        >
          Save Settings
        </button>
        {/* rest to default values */}
        <button
          type="button"
          className="w-full mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition-colors"
          onClick={() => {
            setValue("brushColor", defaultAppConfiguration.brushColor);
            setValue("brushWidth", defaultAppConfiguration.brushWidth);
            setValue("showGrid", defaultAppConfiguration.showGrid);
            setValue(
              "showMedianLines",
              defaultAppConfiguration.showMedianLines
            );
            setValue("showDebug", defaultAppConfiguration.showDebug);
            setValue("quizMode", defaultAppConfiguration.quizMode);
            handleSubmit(onSubmit)();
          }}
        >
          Reset to Default Values
        </button>
      </form>
    </div>
  );
}

export default Settings;
