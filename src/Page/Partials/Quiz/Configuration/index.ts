import {
  type QuizConfigMap,
  QuizMode,
} from "..";
import { practiceConfig } from "./practiceConfig";
import { trainerConfig } from "./trainerConfig";
import { writerConfig } from "./writerConfig";

export const defaultStrokeColor = "#CCCCCC";
export const failureStrokeColor = "#FF5685";
export const successColorUserStroke = "#129912";
export const successColorCharStroke = "#000";

export default {
  [QuizMode.PRACTICE]: practiceConfig,
  [QuizMode.TRAIN]: trainerConfig,
  [QuizMode.WRITE]: writerConfig,
} as QuizConfigMap;
