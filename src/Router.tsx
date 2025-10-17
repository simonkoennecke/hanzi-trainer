import { Route, Routes } from "react-router";
import App from "./App";
import SearchResult from "./Page/SearchResultPage";
import DictionaryPage from "./Page/DictionaryPage";
import Home from "./Page/Home";
import TrainingsOverview from "./Page/TrainingsOverview";
import TrainingsSet from "./Page/TrainingSet";
import Training from "./Page/Training";
import Settings from "./Page/Settings";

function Router() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="search/:searchTerm" element={<SearchResult />} />
        <Route path="trainings" element={<TrainingsOverview />} />
        <Route path="training/:trainingsId" element={<TrainingsSet />} />
        <Route path="training/:trainingsId/start" element={<Training />} />
        <Route path="entry/:entry" element={<DictionaryPage />} />
        <Route path="entry/:entry/:pinyin" element={<DictionaryPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default Router;
