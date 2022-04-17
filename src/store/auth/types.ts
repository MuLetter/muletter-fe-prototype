import createActionTypes from "../../utils/createActionTypes";

// Redux Action Types
export const [GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE] =
  createActionTypes("auth/get_token");

// Store Types
export type SpotifyToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
