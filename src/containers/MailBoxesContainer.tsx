import React from "react";
import { ConnectedProps } from "react-redux";
import MailBoxesComponent from "../components/MailBoxesComponent";
import MailBoxConnector from "../store/mailbox/connector";

type Props = ConnectedProps<typeof MailBoxConnector>;

function MailBoxesContainer({ getMailBoxes, mailBoxes, clearStore }: Props) {
  React.useEffect(() => {
    getMailBoxes();

    return () => {
      clearStore();
    };
  }, [getMailBoxes, clearStore]);

  return <MailBoxesComponent mailBoxes={mailBoxes} />;
}

export default MailBoxConnector(MailBoxesContainer);
