interface GridProps {
  visibility: string;
}
function Grid({ visibility }: GridProps) {
  const gridColor = "#99a1af"; // Tailwind gray-300
  return (
    <g key="background_lines" visibility={visibility} className={"grid"}>
      <rect
        x="1"
        y="1"
        width="1023"
        height="1023"
        stroke={gridColor}
        strokeWidth="1"
        fill="transparent"
      />
      <line
        x1="0"
        y1="0"
        x2="1024"
        y2="1024"
        stroke={gridColor}
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="1024"
        x2="1024"
        y2="0"
        stroke={gridColor}
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="512"
        x2="1024"
        y2="512"
        stroke={gridColor}
        strokeWidth="1"
      />
      <line
        x1="512"
        y1="0"
        x2="512"
        y2="1024"
        stroke={gridColor}
        strokeWidth="1"
      />
    </g>
  );
}

export default Grid;
