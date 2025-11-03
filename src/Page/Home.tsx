import { Link } from "react-router";

/**
 * Home and introduction to use this app
 * @returns home page
 */
function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Hanzi Trainer!</h1>
      <div className="mx-auto p-8 mb-8 bg-white rounded-lg outline outline-gray-300">
        <p className="mb-2 text-gray-700">
          This app is designed to help you learn, recognize, and practice
          Chinese characters (Hanzi) in an interactive way.
        </p>
        <p className="mb-2 text-gray-700">
          Easily search for any character to view its stroke order,
          pronunciation, meanings, and example usages. Each character page
          provides detailed information to support your learning.
        </p>
        <p className="mb-2 text-gray-700">
          Explore curated training sets that group characters by theme or
          difficulty, allowing you to systematically build your Hanzi knowledge
          and track your progress.
        </p>
        <p className="mb-6 text-gray-700">
          To get started, use the search bar above to look up a character, or
          browse the training sets below to begin your learning journey.
        </p>
        <p className="text-green-600 font-semibold">Happy learning!</p>
      </div>
      <div className="mx-auto mb-8 p-8 bg-white rounded-lg outline outline-gray-300">
        <h2 className="text-2xl font-bold mb-4">Explore Training Sets</h2>
        <p className="mb-2 text-gray-700">
          Check out our curated training sets to practice your Hanzi skills.
        </p>
        <Link
          to="/trainings"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Training Sets
        </Link>
      </div>
      <div className="mx-auto mb-8 p-8 bg-white rounded-lg outline outline-gray-300">
        <h2 className="text-2xl font-bold mb-4">Search for Characters</h2>
        <p className="mb-2 text-gray-700">
          Use the search bar at the top to find specific characters and their
          details.
        </p>
        <p className="mb-2 text-gray-700">
          You can search by character, pinyin, or English definition.
        </p>
        <p className="mb-2 text-gray-700">
          Try searching for single characters like{" "}
          <Link to="/search/你" className="text-blue-600 hover:underline">
            你
          </Link>
          ,{" "}
          <Link to="/search/好" className="text-blue-600 hover:underline">
            好
          </Link>{" "}
          for hello, or{" "}
          <Link to="/search/学" className="text-blue-600 hover:underline">
            学
          </Link>
          ,{" "}
          <Link to="/search/习" className="text-blue-600 hover:underline">
            习
          </Link>{" "}
          for study. Try searching for them one by one to see how it works!
        </p>
        <p className="mb-2 text-gray-700">
          The search results will provide you with detailed information about
          each character, including its pronunciation and meaning.
        </p>
        <p className="mb-2 text-gray-700">
          Start exploring and enhancing your Hanzi knowledge today!
        </p>
      </div>

      <div className="mx-auto mb-8  p-8 bg-white rounded-lg outline outline-gray-300 mt-8">
        <h2 className="text-2xl font-bold mb-4">App Customization</h2>
        <p className="mb-2 text-gray-700">
          Customize your app experience by adjusting the settings below.
        </p>
        <Link
          to="/settings"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Change settings
        </Link>
      </div>
      <div className="mx-auto mb-8  p-8 bg-white rounded-lg outline outline-gray-300 mt-8">
        <h2 className="text-2xl font-bold mb-4">Credits</h2>
        <p className="mb-2 text-gray-700">
          This app uses the open-source data from{" "}
          <a
            href="https://github.com/skishore/makemeahanzi/tree/master"
            className="text-blue-600 hover:underline"
          >
            Make Me a Hanzi
          </a>
          ,{" "}
          <a
            href="https://github.com/chanind/hanzi-writer-data"
            className="text-blue-600 hover:underline"
          >
            Hanzi Writer Data
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/hugolpz/audio-cmn"
            className="text-blue-600 hover:underline"
          >
            Audio CMN
          </a>
          . Many thanks to the maintainers of these projects for making learning
          resources freely available!
        </p>
      </div>
    </div>
  );
}

export default Home;
