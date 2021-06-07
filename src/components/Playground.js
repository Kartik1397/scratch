// React
import React, { useReducer, useEffect } from "react";

// Components
import Block from "./Blocks/Block";
import Move from "./Blocks/Motion/Move";
import Event from "./Blocks/Events/Event";
import Say from "./Blocks/Looks/Say";

// Action
import ActionManager from "../actions/manager";

// Types
import {
  MOTION_MOVE,
  EVENT_START_CLICK,
  LOOKS_SAY
} from './Blocks/types';

// SCSS
import './Playground.scss';

const sideBarBlockComponentMap = {
  [MOTION_MOVE]: (transform) => <Move transform={transform} defaultStepValue={10} sidebar={true} />,
  [EVENT_START_CLICK]: (transform) => <Event transform={transform} sidebar={true} />,
  [LOOKS_SAY]: (transform) => <Say defaultMessage="Hello!" transform={transform} sidebar={true} />
}

const blockComponentMap = {
  [MOTION_MOVE]: (block) => <Move defaultStepValue={block.value} transform={block.transform} innerOnly={true} />,
  [EVENT_START_CLICK]: (block) => <Event transform={block.transform} innerOnly={true} />,
  [LOOKS_SAY]: (block) => <Say defaultMessage={block.value} ransform={block.transform} innerOnly={true} />
};

export default function Playground() {
  const [playgroundState, dispatch] = useReducer(ActionManager.reducer, ActionManager.state);
  console.log(playgroundState);
  useEffect(() => {
    ActionManager.setDispatch(dispatch);
  }, [dispatch]);

  const renderScriptBlocks = (block) => {
    if (block.sprite === ActionManager.activeSprite.id) {
      return (
        <Block onMouseDown={ActionManager.Block.mouseDown} id={block.id} transform={block.transform} newlyCreated={block.newlyCreated}>
          {
            blockComponentMap[block.type](block)
          }
          {
            block.next && renderScriptBlocks(block.next)
          }
        </Block>
      )
    }
    return null;
  }

  return (
    <>
      <svg
        className="Playground"
        width={"100%"}
        height={"100%"}
        onMouseDown={(e) => ActionManager.mouseDown({ clientX: e.clientX, clientY: e.clientY })}
        onMouseMove={ActionManager.mouseMove}
        onMouseUp={(e) => {
          ActionManager.mouseUp({ clientX: e.clientX, clientY: e.clientY })
        }}
      >
        <rect height="1000px" width="240px" fill="#C9DFFA"></rect>
        <g transform="translate(30, 30)">
          {
            playgroundState.sideBarBlocks.map((block, index) => {
              return sideBarBlockComponentMap[block.type]({ x: 0, y: index * 60 });
            })
          }
        </g>
        <g>
          {
            Object.keys(playgroundState.scripts).map((scriptId) => {
              return (
                <g key={scriptId}>
                  {
                    renderScriptBlocks(playgroundState.scripts[scriptId].blocks)
                  }
                </g>
              )
            })
          }
        </g>
      </svg>
      <div className="Playground" style={{ pointerEvents: "none" }}>
        <div>
          <ul style={{
            listStyle: 'none',
            background: "white",
            border: "1px solid rgba(0,0,0, 0.3)",
            borderRadius: "5px",
            display: "none"
          }}>
          </ul>
        </div>
      </div>
    </>
  );
}
