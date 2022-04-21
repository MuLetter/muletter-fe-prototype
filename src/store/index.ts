import { combineReducers } from "redux";
import auth from "./auth";
import info from "./info";
import mailBox from "./mailbox";
import mailBoxMap from "./mailBoxMap";

const rootReducer = combineReducers({ auth, info, mailBox, mailBoxMap });

export default rootReducer;
