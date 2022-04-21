import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import infoSaga from "./info/saga";
import mailBoxSaga from "./mailbox/saga";
import mailBoxMapSaga from "./mailBoxMap/saga";

export default function* RootSaga() {
  yield all([authSaga(), infoSaga(), mailBoxSaga(), mailBoxMapSaga()]);
}
