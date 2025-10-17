import type { ReactNode } from "react";
import type { Points } from "../../../Geometry";

interface LineProps extends React.SVGProps<SVGLineElement> {
  line: Points;
  circle?: boolean;
  arrows?: boolean;
  numbered?: boolean;
  fadeOut?: boolean;
}

/**
 * Draw points and path between them with arrows indicating direction
 * @param line Array of points
 * @returns
 */
function Line(props: LineProps): ReactNode {
  const { line, circle, arrows, numbered, fadeOut, ...rest } = props;
  const { visibility } = props;
  if (visibility === "hidden") return null; // Skip rendering if visibility is hidden
  if (!line || !Array.isArray(line)) return null;
  if (line.length < 2) return null; // Need at least two points to draw a line

  const svgPath = line.reduce((acc, point, index) => {
    if (index === 0) {
      return `M ${point[0]} ${point[1]}`;
    }
    return `${acc} L ${point[0]} ${point[1]}`;
  }, "");

  return (
    <>
      {circle &&
        line.map((line, index) => (
          <circle
            key={"point_" + index}
            cx={line[0]}
            cy={line[1]}
            r={3}
            fill="red"
          />
        ))}
      {!arrows && (
        <path
          {...rest}
          d={svgPath}
          fill={"transparent"}
          style={{
            ...props.style,
            opacity: 1,
            animation: fadeOut ? `fadeout 2s forwards` : ``,
          }}
        />
      )}
      {arrows &&
        line.map((point, index) => {
          if (index === 0) return null;
          const prevPoint = line[index - 1];

          const angle = Math.atan2(
            point[1] - prevPoint[1],
            point[0] - prevPoint[0]
          );
          const arrowLength = 10;
          const arrowAngle = Math.PI / 6; // 30 degrees
          const arrowPoint1 = [
            point[0] - arrowLength * Math.cos(angle - arrowAngle),
            point[1] - arrowLength * Math.sin(angle - arrowAngle),
          ];
          const arrowPoint2 = [
            point[0] - arrowLength * Math.cos(angle + arrowAngle),
            point[1] - arrowLength * Math.sin(angle + arrowAngle),
          ];
          return (
            <g
              key={"arrow_" + index}
              style={
                props.fadeOut
                  ? { opacity: 0.3, transition: "opacity 0.5s" }
                  : undefined
              }
            >
              <line
                {...rest}
                x1={prevPoint[0]}
                y1={prevPoint[1]}
                x2={point[0]}
                y2={point[1]}
              />
              <line
                {...rest}
                x1={point[0]}
                y1={point[1]}
                x2={arrowPoint1[0]}
                y2={arrowPoint1[1]}
              />
              <line
                {...rest}
                x1={point[0]}
                y1={point[1]}
                x2={arrowPoint2[0]}
                y2={arrowPoint2[1]}
              />
            </g>
          );
        })}
      {/* Draw Index above circle */}
      {numbered &&
        line.map((point, index) => (
          <text
            key={"index_" + index}
            x={point[0]}
            y={point[1] - 10}
            fontSize={12}
            fill="black"
            textAnchor="middle"
          >
            {index + 1}
          </text>
        ))}
    </>
  );
}

export default Line;
