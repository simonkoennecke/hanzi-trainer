import type { CompareLinesResult, Points } from "./";
import {
  centerPoint,
  distanceLine,
  euclideanDistance,
  meanRadian,
  sameDirection,
} from "./utils";
import frechetDistance from "./frechetDistance";
import type { CompareLineVector } from "./types";

// Define thresholds for validation
export const CompareLinesThresholds = {
  frechetDistance: 0.45, // Normalized distance threshold
  direction: Math.PI / 4, // 45 degrees in radians
  lengthRatio: 0.7, // At least 70% length similarity
  centerDistance: 120, // Center points must be within 120 units
};

/**
 * Calculate geometric properties of a line
 * @param P Array of points representing a line
 * @returns Vector representation of the line
 */
export function compareLineVector(P: Points): CompareLineVector {
  const lineLength = distanceLine(P);
  const centerpoint = centerPoint(P);
  const avgRadian = meanRadian(P);
  return { lineLength, centerpoint, avgRadian };
}

export function compareLines(P: Points, Q: Points): CompareLinesResult {
  const invalidCompare = {
    distance: Number.MAX_VALUE,
    sameDirection: 0,
    lengthCorrelation: 0,
    isValid: false,
  };
  // Check if both lines are defined
  if (!P || !Q) return invalidCompare;
  try {
    const pVector = compareLineVector(P);
    const qVector = compareLineVector(Q);
    const normDistance =
      frechetDistance(P, Q) / Math.max(pVector.lineLength, qVector.lineLength);
    // compare pVector and qVector by calculating the cosine similarity of avgRadian
    const angleDiff = Math.abs(pVector.avgRadian - qVector.avgRadian);

    const line_ratio =
      pVector.lineLength > qVector.lineLength
        ? qVector.lineLength / pVector.lineLength
        : pVector.lineLength / qVector.lineLength;

    // Check center point distance
    const centerPointDistance = euclideanDistance(
      pVector.centerpoint,
      qVector.centerpoint
    );
    // Validate: at least 3 of 4 criteria must be true
    const criteria = [
      sameDirection(P, Q),
      (pVector.lineLength > 250 &&
        normDistance <= CompareLinesThresholds.frechetDistance) ||
        pVector.lineLength <= 250,
      angleDiff <= CompareLinesThresholds.direction,
      (pVector.lineLength <= 250 &&
        line_ratio >= CompareLinesThresholds.lengthRatio - 0.2) ||
        (pVector.lineLength > 250 &&
          line_ratio >= CompareLinesThresholds.lengthRatio),
      (pVector.lineLength <= 600 &&
        centerPointDistance <= CompareLinesThresholds.centerDistance) ||
        (pVector.lineLength > 600 &&
          centerPointDistance <= CompareLinesThresholds.centerDistance + 20),
    ];
    const isValid = criteria.filter(Boolean).length >= 4;

    return {
      distance: normDistance,
      sameDirection: angleDiff,
      lengthCorrelation: line_ratio, // Ratio of lengths
      centerPointDistance,
      isValid,
    };
  } catch (e) {
    console.error("Error comparing lines", e);
    return invalidCompare;
  }
}
