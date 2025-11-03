import { useDictionaryContext } from "../../../Context";
import { useMemo, useRef } from "react";

interface PinyinWithAudioProps {
  pinyin: string;
}

function PinyinWithAudio({ pinyin }: PinyinWithAudioProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const { audio } = useDictionaryContext()!;
  const audioAvailable = useMemo(() => {
    return audio.includes(pinyin);
  }, [audio, pinyin]);

  if (!audioAvailable) {
    return <span>{pinyin}</span>;
  }
  const play = (e?: any) => {
    e?.stopPropagation();
    e?.preventDefault();
    ref.current?.play();
  };
  return (
    <div onClick={play} className="flex items-center justify-center group">
      <button
        onClick={play}
        className="w-4 h-4 outline outline-gray-600 rounded-full group-hover:outline-indigo-600 group-hover:outline-2 group-focus:outline-indigo-600 group-focus:outline-2 flex items-center justify-center"
        tabIndex={-1}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-gray-600 stroke-gray-600 group-hover:stroke-indigo-600 group-focus:stroke-indigo-600"
          style={{ marginLeft: "2px" }}
        >
          {/* Play button */}
          <path d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.75a1 1 0 000-1.74z" />
        </svg>
      </button>
      <span className="ml-1 text-gray-600 group-hover:text-indigo-600 group-focus:text-indigo-600">
        {pinyin}
      </span>

      <audio ref={ref} key={pinyin} className="hidden" controls>
        <source
          src={`/hanzi-trainer/audios/${pinyin}.mp3`}
          type="audio/mpeg"
        ></source>
      </audio>
    </div>
  );
}

export default PinyinWithAudio;