import DictionaryCard from "./Partials/DictionaryCard";
import { useDictionaryContext } from "../Context";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";

function PageinationControls({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const { trainingsId } = useParams();
  const navigate = useNavigate();

  const setPage = (newPage: number) => {
    navigate(`/training/${trainingsId}/page/${newPage}`);
  };
  return (
    <div className="flex justify-center my-6 space-x-2">
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 w-10 h-10"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <span className="px-2 py-2">
        Page {page} / {totalPages}
      </span>
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 w-10 h-10"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

function TrainingsSet() {
  const { getEntry } = useDictionaryContext()!;
  const { trainingsId, page } = useParams();
  const navigate = useNavigate();
  const { loadTrainingSet } = useDictionaryContext()!;
  const training = useMemo(
    () => loadTrainingSet(trainingsId!)!,
    [trainingsId, loadTrainingSet]
  );
  const entriesPerPage = 52;
  const allEntries = training.entries.map(getEntry).filter((e) => e !== null);
  const totalPages = Math.ceil(allEntries.length / entriesPerPage);
  const pagedEntries = allEntries.slice(
    ((Number(page) || 1) - 1) * entriesPerPage,
    (Number(page) || 1) * entriesPerPage
  );

  return (
    <div className="mx-auto -mt-3">
      <div className="flex mb-4">
        <div>
          {/* Training Set Navigation */}
          <Link to={"/trainings"}>
            <span className={"text-sm text-gray-500"}>
              ← Back to Training Sets
            </span>
          </Link>
          {/* Training Set Title and Description */}
          <h1 className="text-3xl font-bold mb-2">
            Training Set: {training.title}{" "}
            {training.source && (
              <span className="mb-8 text-gray-600 text-sm color-gray-500">
                (<a href={training.source}>🔗</a>)
              </span>
            )}
          </h1>
        </div>
        <div className="align-right ml-auto mt-5">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              navigate(`/training/${trainingsId}/start`);
            }}
          >
            Start Training
          </button>
        </div>
      </div>
      <div className="mb-8 text-gray-700">{training.description}</div>

      {/* Pagination logic */}

      <PageinationControls page={Number(page) || 1} totalPages={totalPages} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pagedEntries.map((entry) => (
          <DictionaryCard key={entry.character} dictionaryEntry={entry} />
        ))}
      </div>
      <PageinationControls page={Number(page) || 1} totalPages={totalPages} />
    </div>
  );
}

export default TrainingsSet;
