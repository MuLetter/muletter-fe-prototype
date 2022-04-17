import { handleActions } from "redux-actions";
import { CLEAR } from "../common/types";
import {
  GET_MAILBOXES_SUCCESS,
  GET_MAIL_SUCCESS,
  Mail,
  MailBox,
  POST_MAILBOX_SUCCESS,
} from "./types";

type MailBoxStore = {
  mailBoxes: MailBox[] | null;

  mailBox: MailBox | null;
  mail: Mail | null;
};

const mailBoxStore: MailBoxStore = {
  mailBoxes: null,
  mailBox: null,
  mail: null,
};

const MailBoxReducer = handleActions<MailBoxStore, any>(
  {
    [GET_MAILBOXES_SUCCESS]: (state, action) => ({
      ...state,
      mailBoxes: action.payload.mailBoxes,
    }),
    [GET_MAIL_SUCCESS]: (state, action) => ({
      ...state,
      mailBox: action.payload.mailBox,
      mail: action.payload.mail,
    }),
    [POST_MAILBOX_SUCCESS]: (state, action) => ({
      ...state,
      mailBox: action.payload.mailBox,
    }),
    [CLEAR("mailbox")]: (state, action) => ({
      ...state,
      mailBoxes: null,
      mailBox: null,
    }),
  },
  mailBoxStore
);
export default MailBoxReducer;
