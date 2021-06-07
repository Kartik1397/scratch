// React
import React from "react";

// Components
import PreviewArea from "./components/PreviewArea";
import Playground from "./components/Playground";

// Styles
import './App.scss';

export default function App() {
  return (
    <div className="App">
        <div className="Editor">
          <Playground />
        </div>
        <div className="Preview">
          <PreviewArea />
        </div>
    </div>
  );
}
