// React
import React, { useEffect, useRef } from "react";

// Action
import ActionManager from "../../actions/manager";

export default function Block({
  children,
  transform = { x: 0, y: 0 },
  sidebar,
  type,
  id,
  newlyCreated = false
}) {
  const g = useRef(null);

  useEffect(() => {
    if (!sidebar && newlyCreated) {
      ActionManager.Block.mouseDown({
        element: g.current,
        clientX: ActionManager.mouse.clientX,
        clientY: ActionManager.mouse.clientY,
        sidebar: sidebar,
        type: type
      })
    }
  })

  const eventHandlers = {
    onMouseDown: (e) => {
      e.stopPropagation();
      ActionManager.Block.mouseDown({
        element: g.current,
        clientX: e.clientX,
        clientY: e.clientY,
        sidebar: sidebar,
        type: type
      })
    },
    onMouseEnter: (e) => {
      ActionManager.Block.mouseEnter({ element: g.current, clientX: e.clientX })
    },
    onMouseLeave: (e) => {
      ActionManager.Block.mouseLeave({ clientX: e.clientX })
    }
  }

  return (
    <g
      key={id}
      id={id}
      ref={g}
      transform={
        `translate(${transform.x}, ${transform.y})`
      }
      {...eventHandlers}
    >
      {children}
    </g>
  );
}
