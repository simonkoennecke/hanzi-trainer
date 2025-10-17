import type { Points, CompareLinesResult } from "../../../Geometry";

export const QuizResult = {
  PASSED: "passed",
  FAILED: "failed",
  PENDING: "pending",
} as const;
export type QuizResult = (typeof QuizResult)[keyof typeof QuizResult];

export const QuizMode = {
  PRACTICE: "practice",
  TRAIN: "train",
  WRITE: "write",
} as const;
export type QuizMode = (typeof QuizMode)[keyof typeof QuizMode];

export type QuizConfigResult = {
  _paths: Stroke[];
  _status: strokeConfig[];
};
export type QuizConfig = {
  init(numberOfStrokes: number): strokeConfig[];
  updatePathsAndStatus(
    newPath: Stroke,
    crtPath: Stroke[],
    strokesConfig: strokeConfig[]
  ): QuizConfigResult;
  undo(paths: Stroke[], status: strokeConfig[]): QuizConfigResult;
};
export type QuizConfigMap = {
  [key in QuizMode]: QuizConfig;
};

export type strokeConfig = {
  color?: string;
  showCharStroke: boolean;
  fadeCharStroke: boolean;
  animateCharStroke: boolean;
  showUserStroke: boolean;
  fadeUserStroke: boolean;
  isValid: boolean;
  attempted: number;
};
export type Stroke = {
  id: number;
  points: Points;
  color: string;
  width: number;
} & CompareLinesResult;
