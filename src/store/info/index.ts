import { handleActions } from "redux-actions";
import { Track } from "../mailbox/types";
import { GET_MAIN_DATA_SUCCESS } from "./types";

type InfoStore = {
  mailCount: number | null;
  mailBoxCount: number | null;
  randomTracks: Track[] | null;
};

const store: InfoStore = {
  mailCount: null,
  mailBoxCount: null,
  randomTracks: null,
};

const infoReducer = handleActions<InfoStore, any>(
  {
    [GET_MAIN_DATA_SUCCESS]: (state, action) => ({
      ...action.payload,
    }),
  },
  store
);

export default infoReducer;
