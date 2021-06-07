// Components
import Input from "../../Svg/Input";
import Text from "../../Svg/Text";
import Block from "../Block";

// Types
import { MOTION_MOVE } from "../types";


export default function Move({ onMouseDown, defaultStepValue, transform, innerOnly = false, sidebar = false }) {
  const innerSvg = (
    <>
      <path d="M164 5.04153V32.5C164 34.7091 162.209 36.5 160 36.5H53.4079C52.0427 36.5 50.7182 36.9656 49.6533 37.82L43.047 43.12C42.3371 43.6896 41.4541 44 40.5439 44H26.1194C25.2969 44 24.4944 43.7464 23.8212 43.2739L17.0588 38.5267C16.049 37.8178 14.8452 37.4375 13.6114 37.4375H5C2.79086 37.4375 1 35.6466 1 33.4375V5.9375C1 3.72836 2.79086 1.9375 5 1.9375H13.4334C14.3436 1.9375 15.2266 2.24792 15.9365 2.81749L22.5428 8.11752C23.6077 8.97188 24.9322 9.4375 26.2975 9.4375H40.9403C42.3575 9.4375 43.7288 8.9359 44.8116 8.02156L50.916 2.86636C51.6291 2.26413 52.5304 1.93025 53.4637 1.92253L159.967 1.04166C162.189 1.02328 164 2.81946 164 5.04153Z" fill="#4B96ED" stroke="#17375E" strokeWidth="2" />
      <Text value="MOVE" transform={{ x: 15, y: 22 }} />
      <Input value={defaultStepValue} editiable />
      <Text value="STEPS" transform={{ x: 110, y: 20 }} />
    </>
  )
  if (innerOnly) {
    return innerSvg;
  }
  return (
    <Block onMouseDown={onMouseDown} transform={transform} sidebar={sidebar} type={MOTION_MOVE}>
      {innerSvg}
    </Block>
  );
}
