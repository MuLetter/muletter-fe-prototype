import { takeLatest } from "redux-saga/effects";
import api from "../../api";
import createRequestSaga from "../../utils/createRequestSaga";
import { GET_MAIL, GET_MAILBOXES, POST_MAILBOX } from "./types";

const getMailBoxesSaga = createRequestSaga(
  GET_MAILBOXES,
  api["mailbox"].getMailBoxes
);
const getMailSaga = createRequestSaga(GET_MAIL, api["mailbox"].getMail);
const postMailBoxSaga = createRequestSaga(
  POST_MAILBOX,
  api["mailbox"].postMailBox
);

export default function* mailBoxSaga() {
  yield takeLatest(GET_MAILBOXES, getMailBoxesSaga);
  yield takeLatest(GET_MAIL, getMailSaga);
  yield takeLatest(POST_MAILBOX, postMailBoxSaga);
}
