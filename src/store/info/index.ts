import { handleActions } from "redux-actions";
import { Socket } from "socket.io-client";
import { Track } from "../mailbox/types";
import { GET_MAIN_DATA_SUCCESS, INJECT_SOCKET } from "./types";

type InfoStore = {
  mailCount: number | null;
  mailBoxCount: number | null;
  randomTracks: Track[] | null;
  alertSocket: Socket | null;
};

const store: InfoStore = {
  mailCount: null,
  mailBoxCount: null,
  randomTracks: null,
  alertSocket: null,
};

const infoReducer = handleActions<InfoStore, any>(
  {
    [GET_MAIN_DATA_SUCCESS]: (state, action) => ({
      ...action.payload,
    }),
    [INJECT_SOCKET]: (state, action) => ({
      ...state,
      alertSocket: action.payload,
    }),
  },
  store
);

export default infoReducer;
