import createRequestSaga from "../../utils/createRequestSaga";
import api from "../../api";
import { GET_MAP } from "./types";
import { takeLatest } from "redux-saga/effects";

const getMapSaga = createRequestSaga(GET_MAP, api["map"].getMap);

export default function* mailBoxMapSaga() {
  yield takeLatest(GET_MAP, getMapSaga);
}
