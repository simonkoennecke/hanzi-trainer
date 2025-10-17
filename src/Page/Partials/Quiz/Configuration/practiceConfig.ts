import type { QuizConfig, strokeConfig, Stroke, QuizConfigResult } from "..";
import { defaultStrokeColor, successColorCharStroke, failureStrokeColor, successColorUserStroke } from ".";

export const practiceConfig: QuizConfig = {
  init(numberOfStrokes: number): strokeConfig[] {
    return Array.from({ length: numberOfStrokes }, (_, i) => ({
      showCharStroke: i == 0, // only first stroke visible initially
      fadeCharStroke: false,
      isValid: false,
      animateCharStroke: i == 0,
      showUserStroke: false,
      fadeUserStroke: false,
      attempted: 0,
      color: defaultStrokeColor,
    }));
  },
  updatePathsAndStatus(
    newPath: Stroke,
    crtPath: Stroke[],
    strokesConfig: strokeConfig[]
  ): QuizConfigResult {
    const i = crtPath.length;
    if (i >= strokesConfig.length) {
      throw new Error("No more strokes expected");
    }
    const newStatus = [...strokesConfig];
    if (!newStatus[i]) {
      throw new Error("No stroke config available for the current stroke");
    }
    if (i - 1 >= 0) {
      newStatus[i - 1].showCharStroke = true; // hide previous stroke
      newStatus[i - 1].showUserStroke = false; // hide previous stroke
    }

    newStatus[i].showCharStroke = true;
    newStatus[i].animateCharStroke = false;
    newStatus[i].showUserStroke = true;
    newStatus[i].fadeUserStroke = true;
    newStatus[i].attempted += 1;
    newStatus[i].isValid = newPath.isValid!;
    newStatus[i].color = newPath.isValid
      ? successColorCharStroke
      : failureStrokeColor;
    if (i + 1 < newStatus.length) {
      newStatus[i + 1]!.showCharStroke = true;
      newStatus[i + 1]!.animateCharStroke = true;
    }
    return {
      _paths: [
        ...crtPath,
        {
          ...newPath,
          color: newPath.isValid ? successColorUserStroke : failureStrokeColor,
        },
      ],
      _status: newStatus,
    };
  },
  undo(paths: Stroke[], status: strokeConfig[]): QuizConfigResult {
    if (paths.length === 0) return { _paths: paths, _status: status };
    const _status: strokeConfig[] = [...status];
    const i = paths.length;
    if (i - 1 >= 0) {
      _status[i - 1]!.isValid = false;
      _status[i - 1]!.color = defaultStrokeColor;
      _status[i - 1]!.showUserStroke = false;
    }
    if (i < _status.length) {
      _status[i]!.showCharStroke = false;
      _status[i]!.showUserStroke = false;
      _status[i]!.color = defaultStrokeColor;
    }
    return { _paths: paths.slice(0, -1), _status: _status };
  },
};
