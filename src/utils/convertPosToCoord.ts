import { Coord } from "../store/mailbox/types";

function convertPosToCoord(mapSize: number, item: Coord): Coord {
  const { x, y } = item;

  let _x = 0,
    _y = 0;

  // 2사분면
  if (x <= 0 && y <= 0) {
    _x = x;
    _y = y * -1;
  }
  // 1사분면
  else if (x >= 0 && y <= 0) {
    _x = x;
    _y = y * -1;
  }
  // 4사분면
  else if (x >= 0 && y >= 0) {
    _x = x;
    _y = y * -1;
  }
  // 3사분면
  else if (x <= 0 && y >= 0) {
    _x = x;
    _y = y * -1;
  }

  _x = (100 * _x) / mapSize;
  _y = (100 * _y) / mapSize;

  return {
    x: _x,
    y: _y,
  };
}

export default convertPosToCoord;
