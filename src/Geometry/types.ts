export type CompareLinesResult = {
  distance?: number;
  sameDirection?: number;
  lengthCorrelation?: number;
  centerPointDistance?: number;
  isValid?: boolean;
};
export type Point = [number, number];
export type Points = Point[];
export type CompareLineVector = {
  lineLength: number;
  centerpoint: Point;
  avgRadian: number;
};
