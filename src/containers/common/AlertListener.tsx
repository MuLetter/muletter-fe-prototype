import { useToast } from "@chakra-ui/react";
import React from "react";
import { ConnectedProps } from "react-redux";
import { connect, Socket } from "socket.io-client";
import InfoConnector from "../../store/info/connector";

type Props = ConnectedProps<typeof InfoConnector>;

function AlertListener({ alertSocket, injectSocket }: Props) {
  const toast = useToast();

  React.useEffect(() => {
    if (alertSocket === null) {
      const API_SERVER = process.env.REACT_APP_API_SERVER;
      const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH;

      const io: Socket = connect(`${API_SERVER}`, {
        path: `${SOCKET_PATH}`,
        transports: ["websocket"],
      });

      io.on("connect", () => {
        injectSocket(io);

        io.on("alert", (data: string) => {
          toast({
            title: data,
            position: "top-right",
          });
        });
      });
    }
  }, [alertSocket, injectSocket, toast]);

  return <></>;
}

export default InfoConnector(AlertListener);
