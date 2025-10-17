export function simplifyWithRDP(
  points: [number, number][],
  eps: number = 15
): [number, number][] {
  if (points.length < 3) return points;
  const [sx, sy] = points[0],
    [ex, ey] = points[points.length - 1];
  let maxDist = 0,
    idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const d =
      Math.abs((ey - sy) * px - (ex - sx) * py + ex * sy - ey * sx) /
      Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
    if (d > maxDist) {
      idx = i;
      maxDist = d;
    }
  }
  if (maxDist > eps) {
    const left = simplifyWithRDP(points.slice(0, idx + 1), eps);
    const right = simplifyWithRDP(points.slice(idx), eps);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}
