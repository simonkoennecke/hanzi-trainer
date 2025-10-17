import { useCallback, useState } from "react";
import { useDictionaryContext, type DictionaryEntry } from "../../../Context";
import BaseCanvas from "../CharCanvas";
import { QuizMode, QuizResult, type Stroke } from ".";
import { type strokeConfig } from ".";
import { compareLines } from "../../../Geometry";
import quizConfiguration from "./Configuration";
import DebugTable from "./QuizDebugTable";

interface QuizTailProps {
  data: DictionaryEntry;
  mode: QuizMode;
  className?: string;
  finishHandler?: (result: QuizResult) => void;
}

const QuizTile = ({ data, className, mode, finishHandler }: QuizTailProps) => {
  const { appConfiguration } = useDictionaryContext()!;
  const { init, updatePathsAndStatus, undo } = quizConfiguration[mode];

  const [timer, setTimer] = useState<boolean>(false);
  const [paths, setPaths] = useState<Stroke[]>([]);
  const [status, setStatus] = useState<strokeConfig[]>(
    init(data.strokes.length)
  );

  const checkIfQuitIsFinished = (_paths: Stroke[], _status: strokeConfig[]) => {
    if (_paths.length === data.strokes.length) {
      const allValid = _status.every((s) => s.isValid);
      const result: QuizResult = allValid
        ? QuizResult.PASSED
        : QuizResult.FAILED;

      if (mode === QuizMode.PRACTICE || mode === QuizMode.WRITE) {
        emitFinish(result);
      } else if (mode === QuizMode.TRAIN && _paths[_paths.length - 1].isValid) {
        emitFinish(result);
      }
    }
  };

  const compareAndSetPaths = (newPaths: Stroke) => {
    if (paths.length >= data.strokes.length) {
      if (mode === QuizMode.PRACTICE) {
        return; // no more strokes expected
      } else if (mode === QuizMode.TRAIN) {
        if (status[paths.length - 1].isValid === true) {
          if (!timer) {
            checkIfQuitIsFinished(paths, status);
          }
          return; // no more strokes expected
        }
      }
    }
    let median = data.medians[paths.length];
    if (
      mode === QuizMode.TRAIN &&
      paths.length > 0 &&
      !status[paths.length - 1].isValid
    ) {
      median = data.medians[paths.length - 1];
    }
    const lineWithMedianComparison = {
      ...newPaths,
      ...compareLines(median, newPaths.points),
    };
    try {
      const { _paths, _status } = updatePathsAndStatus(
        lineWithMedianComparison,
        paths,
        status
      );

      // Update state
      setPaths(_paths);
      setStatus(_status);
      // Check if finished
      checkIfQuitIsFinished(_paths, _status);
    } catch (error) {
      console.error("Error in compareAndSetPaths:", error);
    }
  };

  const emitFinish = (result: QuizResult) => {
    setTimer(true);
    setTimeout(() => {
      finishHandler?.(result);
      setTimer(false);
    }, 1000);
  };

  function reset() {
    setPaths([]);
    setStatus(init(data.strokes.length));
  }

  const undoHandler = useCallback(() => {
    const { _paths, _status } = undo(paths, status);
    setPaths(_paths);
    setStatus(_status);
  }, [paths, status, undo]);

  return (
    <>
      {/* timer == true: show loading bar that animates from left to right in 1 second */}
      {timer && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500">
          <div
            className="h-full bg-blue-700 animate-[loading_1s_linear_forwards]"
            style={{ width: "100%" }}
          />
        </div>
      )}
      <div className={(className || "") + " mb-8 block mx-auto"}>
        <BaseCanvas
          data={data}
          strokeConfig={status}
          paths={paths}
          setPath={compareAndSetPaths}
        />
        <div className={"flex mt-5 items-center space-x-2 mx-1"}>
          <button
            className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            onClick={undoHandler}
            disabled={paths.length === 0}
          >
            Undo
          </button>
          <button
            className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            onClick={reset}
            disabled={paths.length === 0}
          >
            Restart
          </button>
        </div>
      </div>
      {appConfiguration.showDebug && <DebugTable data={data} paths={paths} />}
    </>
  );
};

export default QuizTile;
