import createActionTypes from "../../utils/createActionTypes";

// Redux Action Types
export const [GET_MAP, GET_MAP_SUCCESS, GET_MAP_FAILURE] =
  createActionTypes("map/get_map");

// Store Types
export type Track = {
  trackId: string;
  trackName: string;
  artistIds: string;
  artistNames: string;
  image: string;
  duration: number;
};

export type Coord = {
  x: number;
  y: number;
};

export type MailBox = {
  _id: string;
  title: string;
  imagePath?: string;
  tracks: Track[];
  point?: Coord;
  createdAt: string;
  updatedAt: string;
};

export type MapQuery = {
  pointOffset: number;
  centerX: number;
  centerY: number;
};
