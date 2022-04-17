import { takeLatest } from "redux-saga/effects";
import api from "../../api";
import createRequestSaga from "../../utils/createRequestSaga";
import { GET_MAIL, GET_MAILBOXES } from "./types";

const getMailBoxesSaga = createRequestSaga(
  GET_MAILBOXES,
  api["mailbox"].getMailBoxes
);
const getMailSaga = createRequestSaga(GET_MAIL, api["mailbox"].getMail);

export default function* mailBoxSaga() {
  yield takeLatest(GET_MAILBOXES, getMailBoxesSaga);
  yield takeLatest(GET_MAIL, getMailSaga);
}
