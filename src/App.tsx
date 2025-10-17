import { useEffect, useState } from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router";
import { useDictionaryContext } from "./Context";

function App() {
  const navigate = useNavigate();
  const { isReady, init } = useDictionaryContext()!;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isReady) {
      init();
    }
  }, [isReady, init]);

  return (
    <>
      <header className="bg-blue-800 text-white ">
        <div className="flex max-w-4xl mx-auto items-center p-2 px-4 sm:px-2">
          <div className="font-semibold text-xs sm:text-s md:text-base lg:text-xl mr-1 sm:mr-3 md:mr-4 lg:mr-6">
            <Link to="/">Hanzi Trainer</Link>
          </div>
          <div className="flex-grow flex">
            <input
              className="flex-grow border border-darkblue-400 border-r-0 rounded-l px-2 py-1 focus:outline-white hover:outline-white"
              placeholder="Search a word..."
              disabled={!isReady}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!searchTerm) return;
                  navigate("/search/" + searchTerm);
                }
              }}
            />
            <button
              className="flex-fit bg-transparent border-1 border-white text-white text-m px-3 py-1 hover:outline-white focus:outline-white rounded-r"
              onClick={() => {
                if (!searchTerm) return;
                navigate("/search/" + searchTerm);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <div className="border-b border-gray-300  mb-2" />
      <main className="py-2 px-4 sm:px-2 mt-4 max-w-4xl mx-auto items-center">
        {isReady ? (
          <Outlet />
        ) : (
          <div className="text-center text-gray-600">Loading app data...</div>
        )}
      </main>
    </>
  );
}

export default App;
