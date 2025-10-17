import type { QuizConfig, strokeConfig, Stroke, QuizConfigResult } from "..";
import {
  defaultStrokeColor,
  failureStrokeColor,
  successColorCharStroke,
  successColorUserStroke,
} from ".";

export const trainerConfig: QuizConfig = {
  init(numberOfStrokes: number): strokeConfig[] {
    return Array.from({ length: numberOfStrokes }, () => ({
      showCharStroke: false,
      fadeCharStroke: false,
      isValid: false,
      animateCharStroke: false,
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
    let i = crtPath.length;
    const prevConfig: strokeConfig | null = strokesConfig[i - 1] || null;
    if (prevConfig && prevConfig.isValid === false) {
      i -= 1;
    }

    const newStatus = [...strokesConfig];
    if (newPath.isValid === false) {
      const isStrokeAttemptMultipleOfThree =
        newStatus[i]!.attempted % 3 === 0 && newStatus[i]!.attempted > 0;
      // incorrect stroke, do not advance
      newStatus[i]!.showCharStroke = isStrokeAttemptMultipleOfThree;
      newStatus[i]!.fadeCharStroke = isStrokeAttemptMultipleOfThree;
      newStatus[i]!.animateCharStroke = isStrokeAttemptMultipleOfThree;
      newStatus[i]!.showUserStroke = true;
      newStatus[i]!.fadeUserStroke = true;
      newStatus[i]!.attempted += 1;
      newStatus[i]!.isValid = false;
      newStatus[i]!.color = defaultStrokeColor;
      return {
        _paths: [
          ...(prevConfig && prevConfig.isValid
            ? crtPath
            : crtPath.slice(0, -1)), // remove last stroke if any
          { ...newPath, color: failureStrokeColor }, // add the incorrect stroke
        ],
        _status: newStatus,
      };
    }
    // correct stroke, advance to next
    newStatus[i]!.showCharStroke = true;
    newStatus[i]!.fadeCharStroke = false;
    newStatus[i]!.animateCharStroke = false;
    newStatus[i]!.color = successColorCharStroke;
    newStatus[i]!.showUserStroke = true;
    newStatus[i]!.fadeUserStroke = true;
    newStatus[i]!.isValid = true;
    return {
      _paths: [
        ...(crtPath.length === i ? crtPath : crtPath.slice(0, -1)), // remove last stroke if any
        { ...newPath, color: successColorUserStroke }, // add the incorrect stroke
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
      _status[i - 1]!.showCharStroke = false;
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
