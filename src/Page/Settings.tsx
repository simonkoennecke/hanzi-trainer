import { useRef, useState } from "react";
import { useDictionaryContext, type AppConfiguration } from "../Context";
import { useForm } from "react-hook-form";
import { QuizMode } from "./Partials/Quiz";
import defaultAppConfiguration from "../Context/AppConfigurationDefault";
import { TrainingType } from "./Partials/Training";
import QuizModeSelect from "./Partials/Settings/QuizModeSelect";
import labelTrainingType from "./Partials/Settings/labelTrainingType";
import TrainingRounds from "./Partials/Settings/TrainingRounds";
import WritingModeDescriptions from "./Partials/Settings/WritingModeDescriptions";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setFade(true), 500);
    setTimeout(() => {
      setIsSaved(false);
      setFade(false);
    }, 1200);
  };

  // reset logic
  const handleResetDefaults = () => {
    setValue("brushColor", defaultAppConfiguration.brushColor);
    setValue("brushWidth", defaultAppConfiguration.brushWidth);
    setValue("showGrid", defaultAppConfiguration.showGrid);
    setValue("showMedianLines", defaultAppConfiguration.showMedianLines);
    setValue("showDebug", defaultAppConfiguration.showDebug);
    setValue("quizMode", defaultAppConfiguration.quizMode);
    setValue("numberOfQuestions", defaultAppConfiguration.numberOfQuestions);
    setValue(
      "allowTrainingsModes",
      defaultAppConfiguration.allowTrainingsModes
    );
    setValue("trainingQuizMode", defaultAppConfiguration.trainingQuizMode);
    handleSubmit(onSubmit)();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <label className="block text-gray-700 font-medium mb-2">
        Configure your application settings below. Adjust the training rounds,
        brush settings, and other preferences to customize your learning
        experience.
      </label>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg py-2 mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Training</h2>
        <label>Allow the training methods:</label>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {Object.values(TrainingType).map((mode) => (
            <li
              key={mode}
              className="flex items-center bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              onClick={() => {
                const currentValue = watch(
                  `allowTrainingsModes.${mode}` as const
                );
                setValue(`allowTrainingsModes.${mode}`, !currentValue);
              }}
            >
              <input
                type="checkbox"
                {...register(`allowTrainingsModes.${mode}` as const)}
                className="mr-3 accent-blue-500 w-5 h-5"
                id={`allowTrainingsModes_${mode}`}
              />
              <label
                htmlFor={`allowTrainingsModes_${mode}`}
                className="text-gray-700 font-medium select-none"
              >
                {labelTrainingType[mode]}
              </label>
            </li>
          ))}
        </ol>
        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 font-medium mr-4 w-32">
            Number of Questions
          </label>
          <input
            type="range"
            {...register("numberOfQuestions", { valueAsNumber: true })}
            className="w-full accent-blue-500"
            min={5}
            max={25}
          />
          <span className="ml-4 text-gray-600 font-mono">
            {watch("numberOfQuestions")}
          </span>
        </div>
        <div className="mb-6 flex items-center">
          <label className="block text-gray-700 font-medium mr-4 w-32">
            Writing Mode
          </label>
          <QuizModeSelect
            value={watch("trainingQuizMode")}
            onChange={(mode) =>
              setValue(`trainingQuizMode` as const, mode as QuizMode)
            }
          />
        </div>
        {/* Writing Settings */}
        <h2 className="text-2xl font-bold mb-4">Writing</h2>
        <TrainingRounds
          quizModes={quizModes}
          setValue={(name: string, value: any) => setValue(name as any, value)}
          swapQuizMode={swapQuizMode}
          removeQuizMode={removeQuizMode}
          addQuizMode={addQuizMode}
          newQuizModeRef={newQuizModeRef as React.RefObject<HTMLSelectElement>}
          watch={watch}
        />
        <WritingModeDescriptions />
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
          onClick={handleResetDefaults}
        >
          Reset to Default Values
        </button>
      </form>
    </div>
  );
}

export default Settings;
