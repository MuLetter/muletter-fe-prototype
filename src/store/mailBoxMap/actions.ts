import { createAction } from "redux-actions";
import { GET_MAP, MapQuery } from "./types";

export const getMap = createAction<MapQuery>(GET_MAP);
