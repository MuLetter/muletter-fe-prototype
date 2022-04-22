import { Flex } from "@chakra-ui/react";
import MailBoxMap from "./MailBoxMap/MailBoxMap";
import MailBoxMapList from "./MailBoxMap/MailBoxMapList";

function MapComponent() {
  return (
    <Flex
      width="100%"
      height="calc(100vh - 120px)"
      minHeight="814px"
      direction="row"
      alignItems="center"
      padding="32px"
    >
      <MailBoxMap />
      <MailBoxMapList />
    </Flex>
  );
}

export default MapComponent;
