import type { TrainingComponentProps } from ".";
import { QuizMode, QuizResult } from "../Quiz";
import Quiz from "../Quiz/Quiz";

interface WritingProps extends TrainingComponentProps {}

function Writing({ instance, index, total, onAnswer }: WritingProps) {
  return (
    <div className="mb-4">
      <div className="text-xl mb-2">
        Question {index + 1} of {total}
      </div>
      <div className="text-4xl font-bold mb-4 text-center">
        {instance.question.character}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Quiz
          char={instance.question.character}
          quizModes={[QuizMode.TRAIN]}
          onAnswer={(result) => onAnswer(result === QuizResult.PASSED)}
        />
      </div>
    </div>
  );
}

export default Writing;
