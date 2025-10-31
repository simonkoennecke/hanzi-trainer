import type { TrainingComponentProps } from ".";
import { QuizMode, QuizResult } from "../Quiz";
import Quiz from "../Quiz/Quiz";

interface SpeakProps extends TrainingComponentProps {}

function Speak({ instance, index, total, onAnswer }: SpeakProps) {
  return (
    <div className="mb-4">
      <div className="text-xl mb-2">
        Question {index + 1} of {total}
      </div>
      <div className="text-4xl font-bold mb-4 text-center">
        {instance.question.character}
      </div>
      <div className="flex justify-center">
        <Quiz
          char={instance.question.character}
          quizModes={[QuizMode.TRAIN]}
          onAnswer={(result) => onAnswer(result === QuizResult.PASSED)}
        />
      </div>
    </div>
  );
}

export default Speak;
