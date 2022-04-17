import { Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  src?: string;
  setMarkerLoading: (state: boolean) => void;
};
function MarkerImage({ src, setMarkerLoading }: Props) {
  React.useEffect(() => {
    setMarkerLoading(true);
  }, [setMarkerLoading]);

  return <Image src={`${process.env.REACT_APP_API_SERVER}${src}`} />;
}

export default MarkerImage;
