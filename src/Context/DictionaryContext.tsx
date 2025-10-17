import { useState, type ReactNode } from "react";
import Fuse, { type Expression, type FuseIndex } from "fuse.js";
import {
  DictionaryContext,
  type AppConfiguration,
  type Dictionary,
  type DictionaryBaseEntryIndex,
  type DictionaryEntry,
  type TrainingSet,
} from ".";
import defaultAppConfiguration from "./AppConfigurationDefault";

// Provider
export const DictionaryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isInitRunning, setIsInitRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [appConfiguration, setAppConfiguration] = useState(
    {} as AppConfiguration
  );
  const [dict, setDict] = useState({} as Dictionary);
  const [trainingSets, setTrainingSets] = useState([] as TrainingSet[]);
  const [index, setIndex] = useState({} as Fuse<DictionaryBaseEntryIndex>);

  // Chained loading the initial
  const init = async () => {
    if (isInitRunning) return;
    setIsInitRunning(true);
    // Load app configuration from local storage
    const loadAppConfiguration = JSON.parse(
      localStorage.getItem("appConfiguration") || "{}"
    );

    setAppConfiguration({
      ...defaultAppConfiguration,
      ...loadAppConfiguration,
    });
    // Load dictionary
    const _data = await fetch("/hanzi-trainer/characters.json").then((res) =>
      res.json()
    );
    setDict(_data as Dictionary);

    const _indexData = await fetch("/hanzi-trainer/fuse-index.json").then(
      (res) => res.json()
    );

    // Create fuse index
    const _fuseIndex = Fuse.parseIndex(_indexData);
    const fuseIndex = new Fuse(
      Object.values(_data) as FuseIndex<DictionaryBaseEntryIndex>[],
      {
        includeScore: true,
        threshold: 0.2,
        includeMatches: false,
        keys: [
          {
            name: "character",
            weight: 3,
          },
          {
            name: "pinyin",
            weight: 100,
          },
          {
            name: "definition",
            weight: 2,
          },
        ],
        useExtendedSearch: true,
      },
      _fuseIndex
    );
    setIndex(fuseIndex as Fuse<DictionaryBaseEntryIndex>);
    // Load training sets
    const _trainingSets = await fetch(
      "/hanzi-trainer/default-training-sets.json"
    ).then((res) => res.json());
    setTrainingSets(_trainingSets as TrainingSet[]);
    // All done
    setIsReady(true);
  };
  const search = (searchTerm: string | Expression) => {
    return index.search(searchTerm);
  };

  const getEntry = (char: string): DictionaryEntry | null => {
    if (!char) return null;
    if (!dict) return null;
    return dict[char] ? (dict[char] as DictionaryEntry) : null;
  };

  const loadTrainingSet = (trainingsId: string): TrainingSet | null => {
    if (!trainingsId) return null;
    if (!trainingSets) return null;
    return trainingSets.find((set) => set.id === trainingsId) || null;
  };

  const setAppConfigurationHandler = (config: AppConfiguration) => {
    setAppConfiguration(config);
    localStorage.setItem("appConfiguration", JSON.stringify(config));
  };

  return (
    <DictionaryContext.Provider
      value={{
        isReady,
        appConfiguration,
        dictionary: dict,
        trainingSets,
        index,
        init,
        search,
        getEntry,
        loadTrainingSet,
        setAppConfiguration: setAppConfigurationHandler,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};
