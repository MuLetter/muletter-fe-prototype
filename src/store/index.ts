import { combineReducers } from "redux";
import auth from "./auth";
import info from "./info";
import mailBox from "./mailbox";

const rootReducer = combineReducers({ auth, info, mailBox });

export default rootReducer;
