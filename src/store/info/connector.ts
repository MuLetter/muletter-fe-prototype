import { connect } from "react-redux";
import RootReducer from "../types";
import * as actions from "./actions";

const mapState = ({ info }: RootReducer) => ({
  ...info,
});

const InfoConnector = connect(mapState, actions);
export default InfoConnector;
