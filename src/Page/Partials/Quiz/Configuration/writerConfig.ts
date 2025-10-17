import type { QuizConfig, strokeConfig, Stroke, QuizConfigResult } from "..";
import {
  defaultStrokeColor,
  failureStrokeColor,
  successColorCharStroke,
  successColorUserStroke,
} from ".";

export const writerConfig: QuizConfig = {
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
    const i = crtPath.length;
    if (i >= strokesConfig.length) {
      throw new Error("No more strokes expected");
    }

    const _status = [...strokesConfig];
    const _paths = [
      ...crtPath,
      newPath, // add the incorrect stroke
    ];
    _status[i]!.isValid = newPath.isValid!;
    _status[i]!.attempted = 1;
    _status[i]!.showUserStroke = true;

    if (i === strokesConfig.length - 1) {
      // show all char strokes. If stroke is valid mark as green otherwise red
      for (let j = 0; j < _status.length; j++) {
        _status[j]!.showCharStroke = true;
        _status[j]!.showUserStroke = true;
        _status[j]!.color = _status[j]!.isValid
          ? successColorCharStroke
          : failureStrokeColor;
        _paths[j]!.color = _status[j]!.isValid
          ? successColorUserStroke
          : failureStrokeColor;
      }
    }

    return {
      _paths,
      _status,
    };
  },
  undo(paths: Stroke[], status: strokeConfig[]): QuizConfigResult {
    if (paths.length === 0) return { _paths: paths, _status: status };
    const _status = [...status];
    if (paths.length < status.length) {
      _status[paths.length - 1]!.isValid = false;
      _status[paths.length - 1]!.showUserStroke = false;
      _status[paths.length - 1]!.attempted = 0; //reset attempted if user undo before completing all strokes
      return { _paths: paths.slice(0, -1), _status };
    }

    //reset all strokes
    for (let j = 0; j < _status.length; j++) {
      _status[j] = {
        showCharStroke: false,
        fadeCharStroke: false,
        isValid: false,
        animateCharStroke: false,
        showUserStroke: false,
        fadeUserStroke: false,
        attempted: 0,
        color: defaultStrokeColor,
      };
    }
    return { _paths: [], _status: _status };
  },
};
