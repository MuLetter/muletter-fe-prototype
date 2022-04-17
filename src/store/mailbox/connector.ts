import { connect } from "react-redux";
import RootReducer from "../types";
import * as actions from "./actions";

const mapState = ({ mailBox }: RootReducer) => ({
  ...mailBox,
});

const MailBoxConnector = connect(mapState, actions);
export default MailBoxConnector;
