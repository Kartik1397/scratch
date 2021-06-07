// React
import React, { useRef } from "react";

// Action
import ActionManager from "../../actions/manager";

export default function Text({ value, width = 36 }) {
  const text = useRef(null);
  return (
    <g>
      <rect x="65" y="9" width={width} height="20" rx="4" fill="white" stroke="#17375D" strokeWidth="2" />
      <text
        ref={text}
        style={{ userSelect: "none" }}
        y="2"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="14px"
        fill="black"
        fontWeight="bold"
        dominantBaseline="middle"
        dy="0"
        x="19.55685043334961"
        transform={`translate(${62 + width / 10}, 19)`}
        onMouseDown={(e) => {
          e.stopPropagation();
          ActionManager.Text.mouseDown({ element: text.current })
        }}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {value}
      </text>
    </g>
  );
}