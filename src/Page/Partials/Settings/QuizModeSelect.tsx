import { useState } from "react";
import { QuizMode } from "../Quiz";

interface QuizModeSelectProps {
  value: QuizMode;
  onChange: (value: QuizMode) => void;
}
function QuizModeSelect({ value, onChange }: QuizModeSelectProps) {
  const [val, setVal] = useState<QuizMode>(value);
  return (
    <select
      value={val}
      onChange={(e) => {
        const newMode = e.target.value as QuizMode;
        setVal(newMode);
        onChange(newMode);
      }}
      className={"border border-gray-300 rounded px-3 py-1"}
    >
      <option
        value={QuizMode.PRACTICE}
        defaultChecked={val === QuizMode.PRACTICE}
      >
        Practice
      </option>
      <option value={QuizMode.TRAIN} defaultChecked={val === QuizMode.TRAIN}>
        Train
      </option>
      <option value={QuizMode.WRITE} defaultChecked={val === QuizMode.WRITE}>
        Write
      </option>
    </select>
  );
}

export default QuizModeSelect;
