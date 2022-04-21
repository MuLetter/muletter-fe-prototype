import { CSSProperties } from "styled-components";
import { Coord } from "../store/mailbox/types";

function convertCoordToPos(mapSize: number, item: Coord): CSSProperties {
  const { x, y } = item;

  let _x = 0,
    _y = 0;
  // 1사분면
  if (x >= 0 && y >= 0) {
    // + +
    // left : + , top : -
    _x = x;
    _y = y * -1;
  }
  // 2사분면
  else if (x <= 0 && y >= 0) {
    // - +
    // left : -, top : -
    _x = x;
    _y = y * -1;
  }
  // 3사분면
  else if (x <= 0 && y <= 0) {
    // - -
    // left: -, top : +
    _x = x;
    _y = y * -1;
  }
  // 4사분면
  else if (x >= 0 && y <= 0) {
    // + -
    // left: +, top: +
    _x = x;
    _y = y * -1;
  }

  const width = (48 * 300) / mapSize;
  _x = (300 * _x) / 100 - width / 2;
  _y = (300 * _y) / 100 - width / 2;
  const height = width;

  return {
    width: width,
    height: height,
    transform: "translateX(" + _x + "px) translateY(" + _y + "px)",
  };
}

export default convertCoordToPos;
