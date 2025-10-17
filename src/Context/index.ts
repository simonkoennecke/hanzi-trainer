export * from "./DictionaryContext";
export * from "./types";
import { createContext, useContext } from "react";
import type { DictionaryContextType } from "./types";

// Create Context
export const DictionaryContext = createContext<
  DictionaryContextType | undefined
>(undefined);

// Hook for easy usage
export const useDictionaryContext = (): DictionaryContextType | undefined => {
  const _context = useContext(DictionaryContext);
  if (!_context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return _context;
};
