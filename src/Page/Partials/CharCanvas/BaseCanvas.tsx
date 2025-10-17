import { useRef, useState } from "react";
import { useDictionaryContext, type DictionaryEntry } from "../../../Context";
import {
  applyMatrixToPoints,
  simplifyWithRDP,
  type Point,
} from "../../../Geometry";
import Line from "./Line";
import Grid from "./Grid";
import type { Stroke, strokeConfig } from "../Quiz";
import PolygonBrushReveal from "./PolygonBrushReveal";

interface QuizCanvasProps {
  data: DictionaryEntry;
  paths: Stroke[];
  strokeConfig: strokeConfig[];
  setPath: (paths: Stroke) => void;
  className?: string;
}

/**
 * Quiz canvas component for drawing characters
 * @param data DictionaryEntry containing character and strokes
 * @returns QuizCanvas component
 */
function BaseCanvas({
  data,
  paths,
  setPath,
  strokeConfig,
  className,
}: QuizCanvasProps) {
  const { appConfiguration } = useDictionaryContext()!;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [current, setCurrent] = useState<Stroke | null>(null);

  function getPointFromEvent(e: PointerEvent): Point {
    const svg = svgRef.current;
    if (!svg) return [0, 0];
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return [0, 0];
    const transformed = pt.matrixTransform(ctm.inverse());
    return [transformed.x, transformed.y];
  }

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>): void {
    e.preventDefault();
    if (e.button && e.button !== 0) return;
    const pt = getPointFromEvent(e.nativeEvent);
    const id = Date.now() + Math.random();
    const stroke: Stroke = {
      id,
      points: [pt],
      color: appConfiguration.brushColor,
      width: appConfiguration.brushWidth,
    };
    setCurrent(stroke);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>): void {
    if (!current) return;
    const pt = getPointFromEvent(e.nativeEvent);
    const last = current.points[current.points.length - 1];
    if (last && last[0] === pt[0] && last[1] === pt[1]) return;
    setCurrent((prev) =>
      prev ? { ...prev, points: [...prev.points, pt] } : null
    );
    // stop if mouse leaves the canvas
    if (!svgRef.current?.contains(e.target as Node)) {
      console.log("Pointer left canvas, stopping drawing");
      e.currentTarget.releasePointerCapture(e.pointerId);
      handlePointerUp(e);
    }
  }

  function handlePointerUp(e: React.PointerEvent<SVGSVGElement>): void {
    if (!current) return;

    setPath({
      ...current,
      points: applyMatrixToPoints(simplifyWithRDP(current.points, 1)),
    });
    setCurrent(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className={
        (className || "") + " aspect-square bg-white mx-auto sm:px-2 touch-none px-2"
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Grid visibility={appConfiguration.showGrid ? "visible" : "hidden"} />

      <g
        key="char_strokes"
        className={"base-canvas-strokes"}
        transform="scale(1, -1) translate(0, -900)"
      >
        {/* char strokes */}
        {data.strokes &&
          strokeConfig.map((config, i) => (
            <g key={"char_stroke_" + i} className={"char-stroke"}>
              {config.showCharStroke && config.animateCharStroke && (
                <PolygonBrushReveal
                  polygonPath={data.strokes[i]}
                  medianPoints={data.medians[i]}
                  fillColor={config.color ? config.color : "#000"}
                  fade={config.fadeCharStroke}
                />
              )}
              {config.showCharStroke && !config.animateCharStroke && (
                <path
                  key={"stroke_" + i}
                  fill={config.color ? config.color : "#000"}
                  stroke={config.color ? config.color : "#000"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    opacity: 1,
                    animation: config.fadeCharStroke
                      ? `fadeout 2s forwards`
                      : ``,
                  }}
                  d={data.strokes[i]}
                />
              )}
              {config.showCharStroke && appConfiguration.showMedianLines && (
                <Line
                  key={"stroke_" + i + "_median"}
                  line={data.medians[i]}
                  stroke="#FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  circle={false}
                  arrows={true}
                  numbered={false}
                />
              )}
              {config.showUserStroke && (
                <Line
                  key={"line_" + paths[i].id}
                  circle={false}
                  arrows={false}
                  numbered={false}
                  line={paths[i].points}
                  stroke={paths[i].color}
                  strokeWidth={paths[i].width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fadeOut={config.fadeUserStroke}
                />
              )}
            </g>
          ))}
      </g>
      {/* current path being drawn */}
      {current && (
        <Line
          key={"line_" + current.id}
          line={current.points}
          fill="none"
          stroke={current.color}
          strokeWidth={current.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
export default BaseCanvas;
