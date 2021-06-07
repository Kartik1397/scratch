// React
import React, { useRef } from "react";

export default function Select({ value, onSelect }) {
  const select = useRef();
  return (
    <g
      ref={select}
      transform="translate(105, 8)"
      onMouseDown={(e) => {
        e.stopPropagation();
        const self = select.current.getBoundingClientRect();
        onSelect(self.left, self.top);
        console.log(select.current.getBoundingClientRect());
      }}
    >
      <rect width="103" height="22" rx="11" fill="#80BAFF" />
      <path d="M92.5 14L89.4689 8.75L95.5311 8.75L92.5 14Z" fill="#17375D" />
      <text style={{ userSelect: "none" }} y="12" textAnchor="middle" fontFamily="Arial" fontSize="14px" fill="white" fontWeight="bold" dominantBaseline="middle" dy="0" x="30">{value}</text>
    </g>
  );
}