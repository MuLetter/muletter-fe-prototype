import React from "react";
import { ConnectedProps } from "react-redux";
import { useParams } from "react-router-dom";
import MailBoxComponent from "../components/MailBoxComponent";
import MailBoxConnector from "../store/mailbox/connector";

type Props = ConnectedProps<typeof MailBoxConnector>;

function MailBoxContainer({
  getMail,
  mail,
  mailBox,
  mailTracks,
  clearStore,
  loading,
  lastPage,
}: Props) {
  const { id } = useParams();
  const refPage = React.useRef<number>(1);
  const refLastPage = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (lastPage) refLastPage.current = lastPage;
  }, [lastPage]);

  const nextPage = React.useCallback(() => {
    if (!loading) {
      if (refPage.current < refLastPage.current!) {
        const nextPage = refPage.current + 1;
        if (id) {
          getMail({
            id,
            query: {
              page: nextPage,
            },
          });
        }
        refPage.current = nextPage;
      }
    }
  }, [id, getMail, loading]);

  React.useEffect(() => {
    if (id) {
      getMail({
        id,
        query: {
          page: refPage.current,
        },
      });
    }
  }, [getMail, id]);

  React.useEffect(() => {
    return () => {
      clearStore();
    };
  }, [clearStore]);

  return (
    <MailBoxComponent
      id={id}
      mail={mail}
      mailBox={mailBox}
      nextPage={nextPage}
      mailTracks={mailTracks}
    />
  );
}

export default MailBoxConnector(MailBoxContainer);
