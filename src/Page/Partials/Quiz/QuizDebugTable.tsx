import type { Stroke } from ".";
import type { DictionaryEntry } from "../../../Context";
import { CompareLinesThresholds, distanceLine } from "../../../Geometry";

interface DebugTableProps {
  paths: Stroke[];
  data: DictionaryEntry;
}

const DebugTable = ({ data, paths }: DebugTableProps) => {
  return (
    <div className="overflow-x-auto my-8 w-full mx-auto">
      <table className=" w-full text-sm text-left text-gray-600 border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border-b">Line</th>
            <th className="px-2 py-1 border-b">Status</th>
            <th className="px-2 py-1 border-b">Avg Radian</th>
            <th className="px-2 py-1 border-b">Leash Length</th>
            <th className="px-2 py-1 border-b">Length Ratio</th>
            <th className="px-2 py-1 border-b">Length</th>
            <th className="px-2 py-1 border-b">Center Point Distance</th>
          </tr>
        </thead>
        <tbody>
          {paths.map((result, i) => (
            <tr key={i} className="border-b">
              <td className="px-2 py-1">{i + 1}</td>
              <td className="px-2 py-1">
                {result.isValid ? (
                  <span className="text-green-600">Correct</span>
                ) : (
                  <span className="text-red-600">Incorrect</span>
                )}
              </td>
              <td className="px-2 py-1">
                <span
                  className={
                    result.sameDirection! <= CompareLinesThresholds.direction
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {(result.sameDirection || 0).toFixed(2)}
                </span>
              </td>
              <td className="px-2 py-1">
                <span
                  className={
                    result.distance! <= CompareLinesThresholds.frechetDistance
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result.distance?.toFixed(2)}
                </span>
              </td>
              <td className="px-2 py-1">
                <span
                  className={
                    result.lengthCorrelation! >=
                    CompareLinesThresholds.lengthRatio
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result.lengthCorrelation?.toFixed(2)}
                </span>
              </td>
              <td className="px-2 py-1">
                {distanceLine(data.medians[i])?.toFixed(2)}
              </td>
              <td className="px-2 py-1">
                <span
                  className={
                    result.centerPointDistance! <=
                    CompareLinesThresholds.centerDistance
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result.centerPointDistance?.toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
          {paths.length === 0 && (
            <tr>
              <td colSpan={6} className="px-2 py-1 text-center">
                No lines drawn yet
              </td>
            </tr>
          )}
        </tbody>
        {paths.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={6} className="px-2 py-1 text-right">
                Total Lines: {paths.length}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default DebugTable;
