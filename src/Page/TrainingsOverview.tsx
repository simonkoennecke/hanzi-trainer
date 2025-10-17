import { Link } from "react-router";
import { useDictionaryContext } from "../Context";

function TrainingsOverview() {
  const { trainingSets } = useDictionaryContext()!;

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8">Training Sets</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {trainingSets.map((set) => (
          <Link key={set.id} to={`/training/${set.id}`}>
            <div className="bg-white shadow rounded-lg p-6 flex flex-col outline outline-1 outline-gray-200 hover:outline-blue-400 transition">
              <h2 className="text-xl font-semibold mb-2">{set.title}</h2>
              <p className="text-gray-600 mb-4">{set.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrainingsOverview;
