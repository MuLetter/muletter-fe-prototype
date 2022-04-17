import { createAction } from "redux-actions";
import { Socket } from "socket.io-client";
import { GET_MAIN_DATA, INJECT_SOCKET } from "./types";

export const getMainData = createAction(GET_MAIN_DATA);
export const injectSocket = createAction<Socket>(INJECT_SOCKET);
