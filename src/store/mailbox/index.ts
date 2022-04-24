import { handleActions } from "redux-actions";
import { CLEAR } from "../common/types";
import {
  GET_MAIL,
  GET_MAILBOXES_SUCCESS,
  GET_MAIL_SUCCESS,
  Mail,
  MailBox,
  POST_MAILBOX_SUCCESS,
  Track,
} from "./types";

type MailBoxStore = {
  mailBoxes: MailBox[] | null;

  mailBox: MailBox | null;
  mail: Mail | null;
  mailTracks: Track[] | null;

  page: number | null;
  lastPage: number | null;

  loading: boolean;
};

const mailBoxStore: MailBoxStore = {
  mailBoxes: null,
  mailBox: null,
  mailTracks: null,
  mail: null,
  page: null,
  lastPage: null,
  loading: false,
};

const MailBoxReducer = handleActions<MailBoxStore, any>(
  {
    [GET_MAILBOXES_SUCCESS]: (state, action) => ({
      ...state,
      mailBoxes: action.payload.mailBoxes,
    }),
    [GET_MAIL]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GET_MAIL_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
      mailTracks:
        state.mailTracks !== null
          ? state.mailTracks.concat(action.payload.mail.tracks)
          : action.payload.mail.tracks,
      loading: false,
    }),
    [POST_MAILBOX_SUCCESS]: (state, action) => ({
      ...state,
      mailBox: action.payload.mailBox,
    }),
    [CLEAR("mailbox")]: (state, action) => ({
      ...state,
      mailBoxes: null,
      mailBox: null,
      mailTracks: null,
      page: null,
      lastPage: null,
      loading: false,
    }),
  },
  mailBoxStore
);
export default MailBoxReducer;
