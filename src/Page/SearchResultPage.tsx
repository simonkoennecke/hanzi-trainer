import { useEffect, useMemo, useState } from "react";
import "../App.css";
import {
  useDictionaryContext,
  type DictionaryBaseEntryIndex,
} from "../Context";
import { useParams } from "react-router";
import type { FuseResult } from "fuse.js";
import DictionaryCard from "./Partials/DictionaryCard";

function SearchResultPage() {
  const { searchTerm } = useParams();
  const { search } = useDictionaryContext()!;
  const [searchResultShowItems, setSearchResultShowItems] = useState(20);
  const [pinyinOnly, setPinyinOnly] = useState(false);

  useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("pinyinOnly") === "true") {
      setPinyinOnly(true);
    } else {
      setPinyinOnly(false);
    }
  }, [setPinyinOnly]);

  const setPinyinOnlyHandler = (value: boolean) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("pinyinOnly", value ? "true" : "false");
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
    setPinyinOnly(value);
  };
  const [searchResult, setSearchResult] = useState<
    FuseResult<DictionaryBaseEntryIndex>[]
  >([]);

  useEffect(() => {
    if (!searchTerm) return;
    const defaultShowItems = 20;
    setSearchResultShowItems(defaultShowItems);
    const _searchTerm = pinyinOnly
      ? { $and: [{ pinyin: searchTerm }] }
      : searchTerm;
    const _searchResult = search(_searchTerm);
    setSearchResult(_searchResult);
    if (_searchResult.length < defaultShowItems) {
      setSearchResultShowItems(_searchResult.length);
    }
  }, [pinyinOnly, search, searchTerm]);

  return (
    <>
      <div className="flex mb-6 text-gray-700 mb-1">
        <div>
          Found {searchResult.length} shown {searchResultShowItems} results for
          "{searchTerm}"
        </div>
        <div className="flex-grow" />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="pinyinOnly"
            className="mr-2"
            checked={pinyinOnly}
            onChange={() => setPinyinOnlyHandler(!pinyinOnly)}
          />
          <label htmlFor="pinyinOnly" className="text-sm">
            Pinyin only
          </label>
        </div>
      </div>
      {searchTerm && searchResult.length > 0 ? (
        <div
          className={"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"}
        >
          {searchResult.slice(0, searchResultShowItems).map((result) => (
            <DictionaryCard
              key={result.item.character}
              char={result.item.character}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          {searchTerm
            ? `No results found for "${searchTerm}"`
            : "Please enter a search term"}
        </div>
      )}
      {searchResultShowItems < searchResult.length && (
        <button
          className="w-full bg-blue-500 text-white rounded-md p-2 mt-4 hover:bg-blue-600"
          onClick={() =>
            setSearchResultShowItems(
              searchResultShowItems + 20 > searchResult.length
                ? searchResult.length
                : searchResultShowItems + 20
            )
          }
        >
          Load More
        </button>
      )}
    </>
  );
}

export default SearchResultPage;
