import { euclideanDistance } from "./utils";
import type { Points } from "./types";

/**
 * Discrete Fréchet Distance (DP approach)
 * @param {Array} P - polyline as [[x1,y1], [x2,y2], ...]
 * @param {Array} Q - polyline as [[x1,y1], [x2,y2], ...]
 * @returns {number} Fréchet distance
 */
function frechetDistance(P: Points, Q: Points): number {
  const m = P.length;
  const n = Q.length;

  // Cache table initialized with -1
  const ca = Array.from({ length: m }, () => Array(n).fill(-1));

  function recurse(i: number, j: number): number {
    if (ca[i][j] > -1) return ca[i][j];

    if (i === 0 && j === 0) {
      ca[i][j] = euclideanDistance(P[0], Q[0]);
    } else if (i > 0 && j === 0) {
      ca[i][j] = Math.max(recurse(i - 1, 0), euclideanDistance(P[i], Q[0]));
    } else if (i === 0 && j > 0) {
      ca[i][j] = Math.max(recurse(0, j - 1), euclideanDistance(P[0], Q[j]));
    } else if (i > 0 && j > 0) {
      ca[i][j] = Math.max(
        Math.min(recurse(i - 1, j), recurse(i - 1, j - 1), recurse(i, j - 1)),
        euclideanDistance(P[i], Q[j])
      );
    } else {
      ca[i][j] = Infinity;
    }
    return ca[i][j];
  }

  return recurse(m - 1, n - 1);
}

export default frechetDistance;