import { createAction } from "redux-actions";
import { CLEAR } from "../common/types";
import { GET_MAIL, GET_MAILBOXES, POST_MAILBOX } from "./types";

export const getMailBoxes = createAction(GET_MAILBOXES);
export const getMail = createAction<string>(GET_MAIL);
export const postMailBox = createAction<FormData>(POST_MAILBOX);
export const clearStore = createAction(CLEAR("mailbox"));
