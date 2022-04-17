import createActionTypes from "../../utils/createActionTypes";

// Redux Action Types
export const [GET_MAIN_DATA, GET_MAIN_DATA_SUCCESS, GET_MAIN_DATA_FAILURE] =
  createActionTypes("info/get_main_data");
export const INJECT_SOCKET = "info/inject_socket";

// Store Types
