// React
import React from "react";

// Sprites
import CatSprite from "./CatSprite";

// Action
import ActionManager from "../actions/manager";

// SCSS
import "./PreviewArea.scss";

export default function PreviewArea() {
  return (
    <div className="PreviewArea">
      <div className="Controls">
        <div
          className="button"
          onClick={(e) => {
            ActionManager.Controller.startClick();
          }}
        >
          {"⚐"}
        </div>
        <div
          className="button"
          onClick={(e) => {
            ActionManager.Controller.resetClick();
          }}
        >
          {"Reset"}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0.3210171699523926 0.3000000357627869 950.17898101806641 1000.04156036376953"
        version="1.1"
        xmlSpace="preserve"
      >
        <CatSprite
          onClick={(sprite) => {
            ActionManager.Sprite.setActiveSprite(sprite);
          }}
          id={1}
          defautlActive={true}
          transform={{ x: 0, y: 20 }}
        />
        <CatSprite
          onClick={(sprite) => {
            ActionManager.Sprite.setActiveSprite(sprite);
          }}
          id={2}
          transform={{ x: 0, y: 200 }}
        />
      </svg>
    </div>
  );
}
