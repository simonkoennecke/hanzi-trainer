import { Link } from "react-router";
import { useDictionaryContext, type DictionaryBaseEntry } from "../../Context";
import { useMemo } from "react";

interface DictionaryCardProps {
  dictionaryEntry?: DictionaryBaseEntry;
  char?: string;
  className?: string;
  withoutLink?: boolean;
}
const cssCls =
  " bg-white rounded-md p-4 flex flex-col items-center justify-center outline outline-gray-200 hover:outline-indigo-600 hover:outline-2 focus:outline-indigo-600 focus:outline-2 cursor-pointer";

function DictionaryCard({
  dictionaryEntry,
  char,
  className,
  withoutLink = false,
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
    <div key={char} aria-label={char} className={className + cssCls}>
      <div className="text-4xl mb-2">{char}</div>
      <div className="text-center text-xs text-gray-500">Not found</div>
    </div>;
  }
  if (!data) {
    return null;
  }
  const content = (
    <>
      <div className="text-4xl mb-2">{data.character}</div>
      <div className="text-xl text-gray-600 mb-1">{data.pinyin}</div>
      <div className="text-center text-xs text-gray-500">{data.definition}</div>
    </>
  );
  if (withoutLink) {
    return <div className={className + cssCls}>{content}</div>;
  }
  return (
    <Link
      key={data.character}
      aria-label={data.character + " " + data.pinyin}
      className={className + cssCls}
      to={"/entry/" + data.character + "/" + data.pinyin}
    >
      {content}
    </Link>
  );
}
export default DictionaryCard;
