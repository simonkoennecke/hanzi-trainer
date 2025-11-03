import { useMemo } from "react";
import { useParams } from "react-router";
import { useDictionaryContext } from "../Context";
import Quiz from "./Partials/Quiz/Quiz";
import PinyinWithAudio from "./Partials/Card/PinyinWithAudio";

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
          <div>
            <span className="text-8xl font-bold mb-2">{data.character}</span>
            <div className="text-2xl mt-2">
              {data.pinyin.map((e) => (
                <PinyinWithAudio key={e} pinyin={e} />
              ))}
            </div>
          </div>
          <div className="text-gray-700 mb-4">{data.definition}</div>
          <Quiz char={data.character} quizModes={appConfiguration.quizMode} />
        </div>
      )}
    </>
  );
}
export default DictionaryPage;
