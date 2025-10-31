import { TrainingType } from "../Training";

const labelTrainingType: Record<TrainingType, string> = {
  [TrainingType.CHAR_TO_MEANING]: "Show character, select correct meaning",
  [TrainingType.MEANING_TO_CHAR]: "Show meaning, select correct character",
  [TrainingType.CHAR_TO_PINYIN]: "Show character, select correct pinyin",
  [TrainingType.PINYIN_TO_CHAR]: "Show pinyin, select correct character",
  [TrainingType.SPEAK]: "Speaking practice",
  [TrainingType.WRITING]: "Write the character by drawing strokes",
};

export default labelTrainingType;
