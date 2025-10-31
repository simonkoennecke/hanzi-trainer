import type { TrainingComponentProps } from ".";
import { useDictionaryContext } from "../../../Context";
import DictionaryCard from "../DictionaryCard";
import { QuizResult } from "../Quiz";
import Quiz from "../Quiz/Quiz";

interface WritingProps extends TrainingComponentProps {}

function Writing({ instance, index, total, onAnswer }: WritingProps) {
  const { appConfiguration } = useDictionaryContext()!;
  return (
    <div className="mb-4">
      <div className="text-xl mb-2">
        Question {index + 1} of {total}
      </div>
      <DictionaryCard dictionaryEntry={instance.question} withoutLink={true} />
      <div className="flex justify-center">
        <Quiz
          char={instance.question.character}
          quizModes={[appConfiguration.trainingQuizMode]}
          onAnswer={(result) => onAnswer(result === QuizResult.PASSED)}
        />
      </div>
    </div>
  );
}

export default Writing;
