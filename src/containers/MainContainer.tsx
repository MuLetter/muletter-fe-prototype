import React from "react";
import { ConnectedProps } from "react-redux";
import MainComponent from "../components/MainComponent";
import InfoConnector from "../store/info/connector";

type Props = ConnectedProps<typeof InfoConnector>;
function MainContainer({ mailBoxCount, mailCount, getMainData }: Props) {
  React.useEffect(() => {
    getMainData();
  }, [getMainData]);
  return <MainComponent mailBoxCount={mailBoxCount} mailCount={mailCount} />;
}

export default InfoConnector(MainContainer);
