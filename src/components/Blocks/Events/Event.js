// Components
import Text from "../../Svg/Text";
import Block from "../Block";

// Types
import { EVENT_START_CLICK } from "../types";

export default function Event({ onMouseDown, transform, innerOnly, sidebar = false }) {
  const innerSvg = (
    <>
      <path d="M51.6501 1.93753L51.6584 1.93747L160.467 1.04148C162.689 1.02318 164.5 2.81933 164.5 5.04134V32.5C164.5 34.7091 162.709 36.5 160.5 36.5H53.4079C52.0427 36.5 50.7182 36.9656 49.6533 37.82L43.047 43.12C42.3371 43.6896 41.4541 44 40.5439 44H26.1194C25.2969 44 24.4944 43.7464 23.8212 43.2739L17.0588 38.5267C16.049 37.8178 14.8452 37.4375 13.6114 37.4375H5C2.79086 37.4375 1 35.6466 1 33.4375V5.9375C1 3.72836 2.79086 1.9375 5 1.9375H15.1912H24.0722H42.3017L51.6501 1.93753Z" fill="#FF8D24" stroke="#9E510B" strokeWidth="2" />
      <Text value="WHEN ⚐ CLICKED" transform={{ x: 50, y: 20 }} />
    </>
  )
  
  if (innerOnly) {
    return innerSvg;
  }

  return (
    <Block onMouseDown={onMouseDown} transform={transform} sidebar={sidebar} type={EVENT_START_CLICK} >
      {innerSvg}
    </Block>
  );
}
