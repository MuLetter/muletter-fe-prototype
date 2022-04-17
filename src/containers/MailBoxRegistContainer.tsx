import { useToast } from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import MailBoxRegistComponent from "../components/MailBoxRegistComponent";
import MailBoxConnector from "../store/mailbox/connector";
import { Track } from "../store/mailbox/types";

type TMailBox = {
  [key: string]: any;
  title: string;
  description: string;
};

type Props = ConnectedProps<typeof MailBoxConnector>;
function MailBoxRegistContainer({ mailBox, clearStore, postMailBox }: Props) {
  const navigate = useNavigate();
  const toast = useToast();
  const [selTracks, setSelTracks] = React.useState<Track[]>([]);
  const selectTrack = React.useCallback(
    (selTrack: Track) => {
      setSelTracks((prev) => prev.concat(selTrack));
      toast({
        position: "bottom",
        title: "음악이 추가되었습니다.",
      });
    },
    [toast]
  );

  const onMailBoxSubmit = React.useCallback(
    (data: TMailBox, image: Blob) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const tracks = JSON.stringify(selTracks);
      formData.append("tracks", tracks);
      formData.append("image", image);

      postMailBox(formData);
    },
    [selTracks, postMailBox]
  );

  React.useEffect(() => {
    if (mailBox) navigate("/mailbox");
  }, [mailBox, navigate]);

  React.useEffect(() => {
    return () => {
      clearStore();
    };
  }, [clearStore]);

  return (
    <MailBoxRegistComponent
      selTracks={selTracks}
      selectTrack={selectTrack}
      onMailBoxSubmit={onMailBoxSubmit}
    />
  );
}

export default MailBoxConnector(MailBoxRegistContainer);
