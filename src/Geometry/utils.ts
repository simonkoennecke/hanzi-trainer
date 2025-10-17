import type { Point, Points } from "./types";

/**
 * Euclidean distance between two points
 */

export function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}
/**
 * Check if two polylines face the same direction
 * @param {Array} P - polyline
 * @param {Array} Q - polyline
 * @returns {boolean} true if same direction
 */
export function sameDirection(P: Points, Q: Points): boolean {
  const v1 = [P[P.length - 1][0] - P[0][0], P[P.length - 1][1] - P[0][1]];
  const v2 = [Q[Q.length - 1][0] - Q[0][0], Q[Q.length - 1][1] - Q[0][1]];

  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  return dot >= 0; // positive dot → same general direction
}
/**
 * Calculate the mean radian of a line
 * @param line Array of points representing a line
 * @returns Mean radian of the line
 */
export function meanRadian(line: Points): number {
  if (!line || line.length < 2) return 0;
  let totalRadian = 0;
  for (let i = 1; i < line.length; i++) {
    const dx = line[i][0] - line[i - 1][0];
    const dy = line[i][1] - line[i - 1][1];
    totalRadian += Math.atan2(dy, dx);
  }
  return totalRadian / (line.length - 1);
}
/**
 * Calculate the center point of a line
 * @param line Array of points representing a line
 * @returns Center point of the line
 */
export function centerPoint(line: Points): Point {
  if (!line || line.length === 0) return [0, 0];
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < line.length; i++) {
    sumX += line[i][0];
    sumY += line[i][1];
  }
  return [sumX / line.length, sumY / line.length];
}
/**
 * Calculate the length of a line
 * @param line Array of points representing a line
 * @returns
 */

export function distanceLine(line: Points): number {
  if (!line || line.length < 2) return 0;
  let totalDistance = 0;
  for (let i = 1; i < line.length; i++) {
    totalDistance += euclideanDistance(line[i - 1], line[i]);
  }
  return totalDistance;
}
