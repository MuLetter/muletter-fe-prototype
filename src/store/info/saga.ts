import { takeLatest } from "redux-saga/effects";
import api from "../../api";
import createRequestSaga from "../../utils/createRequestSaga";
import { GET_MAIN_DATA } from "./types";

const getMainDataSaga = createRequestSaga(
  GET_MAIN_DATA,
  api["info"].getMainData
);

export default function* infoSaga() {
  yield takeLatest(GET_MAIN_DATA, getMainDataSaga);
}
