export default function Text({ value, transform }) {
  return (
    <text
      style={{ userSelect: "none" }}
      x="19.55685043334961"
      y="2"
      textAnchor="middle"
      fontFamily="Arial"
      fontSize="12px"
      fill="white"
      fontWeight="bold"
      dominantBaseline="middle"
      transform={`translate(${transform.x}, ${transform.y})`}
    >
      {value}
    </text>
  );
}