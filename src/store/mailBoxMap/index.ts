import { handleActions } from "redux-actions";
import { GET_MAP_SUCCESS, MailBox } from "./types";

type MapStore = {
  mailBoxes: MailBox[] | null;
};

const mapStore = {
  mailBoxes: null,
};

const MapReducer = handleActions<MapStore, any>(
  {
    [GET_MAP_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  mapStore
);
export default MapReducer;
