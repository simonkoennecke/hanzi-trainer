import type { Point } from "./types";

// Apply to a 2D point (x, y)
export function applyMatrix(
  pt: Point,
  transformMatrix = {
    a: 1, // scaleX
    b: 0, // skewY
    c: 0, // skewX
    d: -1, // scaleY
    e: 0, // translateX
    f: 900, // translateY
  } // affine transform for scale(1, -1) translate(0, -900)
): Point {
  const [x, y] = pt;
  const { a, b, c, d, e, f } = transformMatrix;
  const newX = a * x + c * y + e;
  const newY = b * x + d * y + f;
  return [newX, newY];
}

export function applyMatrixToPoints(points: Point[]): Point[] {
  return points.map((point) => applyMatrix(point));
}
