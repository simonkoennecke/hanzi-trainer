import Fuse, { type Expression, type FuseResult } from "fuse.js";
import type { QuizMode } from "../Page/Partials/Quiz";
import type { TrainingType } from "../Page/Partials/Training";

export type AppConfiguration = {
  brushColor: string;
  brushWidth: number;
  strokeColor: string;
  showGrid: boolean;
  showMedianLines: boolean;
  showDebug: boolean;
  quizMode: QuizMode[];
  numberOfQuestions: number;
  allowTrainingsModes: Record<TrainingType, boolean>;
  trainingQuizMode: QuizMode;
};

export type TrainingSet = {
  id: string;
  title: string;
  description: string;
  source: string;
  entries: string[];
};

export type DictionaryBaseEntry = {
  character: string;
  pinyin: string[];
  definition: string;
};
export type DictionaryBaseEntryIndex = {
  character: string;
  pinyin: string[];
  definition: string[];
};

export type DictionaryEntry = DictionaryBaseEntry & {
  strokes: string[];
  medians: [number, number][][];
};

export type Dictionary = Record<string, DictionaryBaseEntry>;

export type DictionaryContextType = {
  isReady: boolean;
  appConfiguration: AppConfiguration;
  dictionary: Dictionary;
  audio: string[]; // list of pinyin strings for which audio files are available
  trainingSets: TrainingSet[];
  index: Fuse<DictionaryBaseEntryIndex>;
  init: () => Promise<void>;
  search: (term: string | Expression) => FuseResult<DictionaryBaseEntryIndex>[];
  getEntry: (char: string) => DictionaryBaseEntry | null;
  loadTrainingSet: (trainingId: string) => TrainingSet | null;
  setAppConfiguration: (config: AppConfiguration) => void;
};
