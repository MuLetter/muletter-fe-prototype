import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ConnectedProps } from "react-redux";
import MailBoxMapConnector from "../../store/mailBoxMap/connector";
import { MailBox } from "../../store/mailBoxMap/types";
import TracksAvatar from "../MailBox/TracksAvatar";

type ItemProps = {
  mailBox: MailBox;
};

function MailBoxItem({ mailBox }: ItemProps) {
  return (
    <Flex
      width="100%"
      height="112px"
      alignItems="center"
      padding="0 32px 0 16px"
      margin="0 0 24px"
      overflow="hidden"
      columnGap="8px"
      direction="row"
    >
      <Image
        src={`${process.env.REACT_APP_API_SERVER}${mailBox.imagePath}`}
        width="120px"
        height="120px"
      />
      <Flex flex="1" height="100%" direction="column">
        <Box flex="1" overflow="hidden">
          <Text
            display="block"
            width="100%"
            fontSize="16px"
            fontWeight="bold"
            height="calc(16px * 1.5)"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {mailBox.title}
          </Text>
          <Text
            display="-webkit-box"
            width="100%"
            height="calc(12px * 1.5 * 3)"
            fontSize="12px"
            overflow="hidden"
            textOverflow="ellipsis"
            wordBreak="break-all"
            color="#e5e5e5"
            sx={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
        <Flex margin="8px 0 0" direction="row" justifyContent="flex-end">
          <TracksAvatar tracks={mailBox.tracks} />
        </Flex>
      </Flex>
    </Flex>
  );
}

type Props = ConnectedProps<typeof MailBoxMapConnector>;
function MailBoxMapList({ mailBoxes }: Props) {
  return (
    <Flex
      height="100%"
      width="calc(100% - 600px)"
      padding="0 0 0 48px"
      justifyContent="center"
    >
      <Box
        width="calc(100% - 60px)"
        height="calc(100%)"
        background="rgba(255,255,255,0.5)"
        borderRadius="16px"
        overflowY="scroll"
        padding="16px 0"
        color="#fff"
      >
        {mailBoxes?.map((mailBox) => (
          <MailBoxItem key={mailBox._id} mailBox={mailBox} />
        ))}
      </Box>
    </Flex>
  );
}

export default MailBoxMapConnector(MailBoxMapList);
