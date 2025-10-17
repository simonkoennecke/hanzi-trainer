import React, { useId, useMemo } from "react";
import { distanceLine } from "../../../Geometry";

type PolygonBrushRevealProps = {
  polygonPath: string;
  medianPoints: [number, number][];
  fillColor?: string;
  brushColor?: string;
  duration?: number;
  fade?: boolean;
};

const PolygonBrushReveal: React.FC<PolygonBrushRevealProps> = ({
  polygonPath,
  medianPoints,
  fillColor = "#CCCCCC",
  duration,
  fade = false,
}) => {
  const uid = useId();
  const clipId = `clip-${uid}`;
  const anim = `anim-${uid}`;

  // build the median path string
  const medianPath = useMemo(() => {
    if (medianPoints.length === 0) return "";
    const [x0, y0] = medianPoints[0];
    const rest = medianPoints.slice(1);
    const segs = rest.map(([x, y]) => `L${x},${y}`).join(" ");
    return `M${x0},${y0} ${segs}`;
  }, [medianPoints]);
  // compute total length
  const totalLength = useMemo(() => {
    return distanceLine(medianPoints);
  }, [medianPoints]);

  const durationFinal = duration ? duration : Math.min(1, totalLength / 300); // 100 pixels per second

  return (
    <>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={polygonPath} fill={fillColor} />
        </clipPath>

        <style>
          {!fade &&
            `
          @keyframes ${anim} {
              from {
                stroke: ${fillColor};
                stroke-dashoffset: ${totalLength};
                stroke-width: 128;
              }
              65% {
                animation-timing-function: step-end;
                stroke: ${fillColor};
                stroke-dashoffset: 0;
                stroke-width: 128;
              }
              to {
                stroke: ${fillColor};
                stroke-width: 1024;
              }
          }
        `}
          {fade &&
            `
          @keyframes ${anim} {
              from {
                stroke: ${fillColor};
                stroke-dashoffset: ${totalLength};
                stroke-width: 128;
              }
              32% {
                animation-timing-function: step-end;
                stroke: ${fillColor};
                stroke-dashoffset: 0;
                stroke-width: 128;
              }
              65% {
                stroke: ${fillColor};
                stroke-width: 1024;
              }
              to {
                stroke: ${fillColor};
                stroke-width: 1024;
                opacity: 0;
              }
          }
        `}
        </style>
      </defs>

      {/* The polygon is clipped by the brush's progressing stroke */}
      <path
        d={medianPath}
        fill="none"
        strokeDasharray={`${totalLength} ${totalLength}`} // large enough to cover most characters
        strokeLinecap="round"
        clipPath={`url(#${clipId})`}
        style={{
          animation: `${anim} ${durationFinal.toFixed(2)}s both`,
          animationDelay: "0s",
          animationTimingFunction: "linear",
        }}
      />
    </>
  );
};
export default PolygonBrushReveal;
