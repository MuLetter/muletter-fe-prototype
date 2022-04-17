import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { ContainerMar16 } from "./common/Container";
import { ContentTitle } from "./common/PageTitle";
import assets from "../assets";
import RegistMailBox from "./MailBox/RegistMailBox";
import { MailBox, Track } from "../store/mailbox/types";
import { useNavigate } from "react-router-dom";

function MailBoxIcon() {
  return (
    <Flex alignItems="center">
      <Image src={assets["Icon"]["Mailx3"]} width="24px" height="24px" />
      <Text margin="0 0 0 8px" fontSize={12} fontWeight="bold">
        2
      </Text>
    </Flex>
  );
}

type TracksProps = {
  tracks: Track[];
};

function MailBoxTracks({ tracks }: TracksProps) {
  return (
    <Box>
      <AvatarGroup
        size="xs"
        max={4}
        sx={{
          "& > .chakra-avatar__excess": {
            fontSize: "8px",
            fontWeight: "bold",
            background: "transparent",
            border: "2px solid #fff",
          },
        }}
      >
        {tracks.map((tracks) => (
          <Avatar key={tracks.trackId} src={tracks.image} size="xs" />
        ))}
      </AvatarGroup>
    </Box>
  );
}

type ItemProps = {
  mailBox: MailBox;
};

function MailBoxItem({ mailBox }: ItemProps) {
  const navigate = useNavigate();

  return (
    <AspectRatio
      width="calc(100% / 4 - 24px)"
      ratio={4 / 3}
      border="1px solid #fff"
      padding="16px"
      boxSizing="border-box"
      color="white"
      cursor="pointer"
      onClick={() => navigate(`/mailbox/${mailBox._id}`)}
    >
      <Flex
        direction="column"
        margin="16px 0 16px"
        justifyContent="flex-start !important"
      >
        <AspectRatio width="calc(100% - 32px)" ratio={4 / 2.25}>
          <>
            {mailBox.imagePath !== "" && (
              <Image
                alt="이미지"
                src={`${process.env.REACT_APP_API_SERVER}${mailBox.imagePath}`}
              />
            )}

            <Box background="rgba(51, 51, 51, 0.3)" />
            <Text fontSize="18px" fontWeight="semibold">
              {mailBox.title}
            </Text>
          </>
        </AspectRatio>
        <Flex
          margin="-16px 0 0"
          padding="0 8px"
          width="calc(100% - 32px)"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          <MailBoxIcon />
          <MailBoxTracks tracks={mailBox.tracks} />
        </Flex>
      </Flex>
    </AspectRatio>
  );
}

type Props = {
  mailBoxes: MailBox[] | null;
};

function MailBoxesComponent({ mailBoxes }: Props) {
  return (
    <ContainerMar16 paddingBottom="160px">
      <ContentTitle>나의 우체통</ContentTitle>
      <Flex margin="32px 0 0" gap="32px" flexWrap="wrap">
        {mailBoxes &&
          mailBoxes.map((mailBox) => (
            <MailBoxItem key={mailBox._id} mailBox={mailBox} />
          ))}
      </Flex>
      <RegistMailBox />
    </ContainerMar16>
  );
}

export default MailBoxesComponent;
