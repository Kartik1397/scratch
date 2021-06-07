// Compoenents
import Input from "../../Svg/Input";
import Text from "../../Svg/Text";
import Block from "../Block";

// Types
import { LOOKS_SAY } from "../types";


export default function Say({ onMouseDown, defaultMessage, transform, innerOnly = false, sidebar = false }) {
  const innerSvg = (
    <>
      <path xmlns="http://www.w3.org/2000/svg" d="M164.5 5.0414V32.5C164.5 34.7091 162.709 36.5 160.5 36.5H53.5508C52.1884 36.5 50.8665 36.9637 49.8026 37.8148L43.1668 43.1235C42.4575 43.6909 41.5763 44 40.668 44H26.1855C25.3648 44 24.564 43.7476 23.8916 43.2769L17.099 38.5221C16.0905 37.8162 14.8893 37.4375 13.6583 37.4375H5C2.79086 37.4375 1 35.6466 1 33.4375V5.9375C1 3.72836 2.79086 1.9375 5 1.9375H13.4805C14.3888 1.9375 15.27 2.24662 15.9792 2.81402L22.6151 8.12271C23.679 8.97381 25.0009 9.4375 26.3633 9.4375H41.0658C42.48 9.4375 43.8488 8.93793 44.9306 8.02697L51.063 2.86283C51.7755 2.26282 52.6751 1.93029 53.6066 1.92261L160.467 1.04153C162.689 1.02321 164.5 2.81937 164.5 5.0414Z" fill="#AF4BED" stroke="#55187A" stroke-width="2"/>
      <Text value="SAY" transform={{ x: 15, y: 22 }} />
      <Input value={defaultMessage} width={60} editiable />
    </>
  )
  if (innerOnly) {
    return innerSvg
  }
  return (
    <Block onMouseDown={onMouseDown} transform={transform} sidebar={sidebar} type={LOOKS_SAY}>
      {innerSvg}
    </Block>
  );
}
