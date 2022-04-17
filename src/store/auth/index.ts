import { handleActions } from "redux-actions";
import { GET_TOKEN_SUCCESS, SpotifyToken } from "./types";

type AuthStore = {
  spotify: SpotifyToken | null;
};

const store: AuthStore = {
  spotify: null,
};

const authReducer = handleActions<AuthStore, any>(
  {
    [GET_TOKEN_SUCCESS]: (state, action) => ({
      ...action.payload,
    }),
  },
  store
);

export default authReducer;
