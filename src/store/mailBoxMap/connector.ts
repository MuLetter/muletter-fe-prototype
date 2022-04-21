import RootReducer from "../types";
import { connect } from "react-redux";
import * as actions from "./actions";

const mapState = ({ mailBoxMap }: RootReducer) => ({
  ...mailBoxMap,
});

const MailBoxMapConnector = connect(mapState, actions);
export default MailBoxMapConnector;
