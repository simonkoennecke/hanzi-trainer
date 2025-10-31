import type { AppConfiguration } from "./types";

export default {
  brushColor: "#193cb8",
  brushWidth: 14,
  showGrid: true,
  showMedianLines: false,
  showDebug: false,
  quizMode: ["practice", "practice", "train", "train", "write", "write"],
  numberOfQuestions: 10,
  allowTrainingsModes: {
    speak: true,
    writing: true,
    char_to_meaning: true,
    meaning_to_char: false,
    char_to_pinyin: false,
    pinyin_to_char: false,
  },
  trainingQuizMode: "train",
} as AppConfiguration;
