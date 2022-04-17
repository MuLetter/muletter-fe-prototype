import api from "../../api";
import createRequestSaga from "../../utils/createRequestSaga";
import { GET_TOKEN } from "./types";
import { takeLatest } from "redux-saga/effects";

const getTokenSaga = createRequestSaga(GET_TOKEN, api["auth"].getToken);

export default function* authSaga() {
  yield takeLatest(GET_TOKEN, getTokenSaga);
}
