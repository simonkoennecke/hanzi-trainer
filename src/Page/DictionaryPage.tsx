import { useMemo } from "react";
import { useParams } from "react-router";
import { useDictionaryContext } from "../Context";
import Quiz from "./Partials/Quiz/Quiz";

function DictionaryPage() {
  const { entry } = useParams();
  const { getEntry, appConfiguration } = useDictionaryContext()!;
  const data = useMemo(() => getEntry(entry!), [entry, getEntry]);

  return (
    <>
      {!data && (
        <div className="text-center text-gray-600">
          Loading character "{entry}"...
        </div>
      )}
      {data && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold mb-2">
            {data.character} - {data.pinyin}
          </div>
          <div className="text-gray-700 mb-4">{data.definition}</div>
          <Quiz char={data.character} quizModes={appConfiguration.quizMode} />
        </div>
      )}
    </>
  );
}
export default DictionaryPage;
