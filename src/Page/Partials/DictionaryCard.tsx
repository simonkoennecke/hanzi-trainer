import { Link } from "react-router";
import { useDictionaryContext, type DictionaryBaseEntry } from "../../Context";
import { useMemo } from "react";

interface DictionaryCardProps {
  dictionaryEntry?: DictionaryBaseEntry;
  char?: string;
  className?: string;
}

function DictionaryCard({
  dictionaryEntry,
  char,
  className,
}: DictionaryCardProps) {
  const { getEntry } = useDictionaryContext()!;

  const data = useMemo(() => {
    if (char) {
      return getEntry(char!);
    } else {
      return dictionaryEntry!;
    }
  }, [char, dictionaryEntry, getEntry]);

  if (!dictionaryEntry && !char) {
    return null;
  }

  if (!data && char) {
    <div
      key={char}
      aria-label={char}
      className={
        className +
        " bg-white rounded-md p-4 flex flex-col items-center justify-center outline outline-gray-200 hover:outline-indigo-600 hover:outline-2 focus:outline-indigo-600 focus:outline-2 cursor-pointer"
      }
    >
      <div className="text-4xl mb-2">{char}</div>
      <div className="text-center text-xs text-gray-500">Not found</div>
    </div>;
  }
  if (!data) {
    return null;
  }
  return (
    <Link
      key={data.character}
      aria-label={data.character + " " + data.pinyin}
      className={
        className +
        " bg-white rounded-md p-4 flex flex-col items-center justify-center outline outline-gray-200 hover:outline-indigo-600 hover:outline-2 focus:outline-indigo-600 focus:outline-2 cursor-pointer"
      }
      to={"/entry/" + data.character + "/" + data.pinyin}
    >
      <div className="text-4xl mb-2">{data.character}</div>
      <div className="text-xl text-gray-600 mb-1">{data.pinyin}</div>
      <div className="text-center text-xs text-gray-500">{data.definition}</div>
    </Link>
  );
}
export default DictionaryCard;
