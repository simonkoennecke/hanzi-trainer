import type { DictionaryBaseEntry } from "../../../Context";

export const TrainingType = {
  CHAR_TO_MEANING: "char_to_meaning", // User sees Chinese character, guesses English meaning
  MEANING_TO_CHAR: "meaning_to_char", // User sees English meaning, guesses Chinese character
  CHAR_TO_PINYIN: "char_to_pinyin", // User sees Chinese character, guesses Pinyin
  PINYIN_TO_CHAR: "pinyin_to_char", // User sees Pinyin, guesses Chinese character
  SPEAK: "speak",
  WRITING: "writing",
} as const;

export type TrainingType = (typeof TrainingType)[keyof typeof TrainingType];

export interface TrainingInstance {
  type: TrainingType;
  question: DictionaryBaseEntry;
  answers: DictionaryBaseEntry[];
}

export interface TrainingInstanceState {
  status: "pending" | "correct" | "incorrect";
}

export interface TrainingComponentProps {
  instance: TrainingInstance;
  index: number;
  total: number;
  onAnswer: (isCorrect: boolean) => void;
}
