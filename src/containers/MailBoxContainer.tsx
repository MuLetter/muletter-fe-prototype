import React from "react";
import { ConnectedProps } from "react-redux";
import { useParams } from "react-router-dom";
import MailBoxComponent from "../components/MailBoxComponent";
import MailBoxConnector from "../store/mailbox/connector";

type Props = ConnectedProps<typeof MailBoxConnector>;

function MailBoxContainer({ getMail, mail, mailBox }: Props) {
  const { id } = useParams();

  React.useEffect(() => {
    getMail(id as string);
  }, [getMail, id]);

  return <MailBoxComponent id={id} mail={mail} mailBox={mailBox} />;
}

export default MailBoxConnector(MailBoxContainer);
