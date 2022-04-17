import { Flex, Image, Text } from "@chakra-ui/react";
import { Track } from "../../store/mailbox/types";
import timeutils from "../../utils/timeutils";

type ItemProps = {
  track: Track;
};
function TrackItem({ track }: ItemProps) {
  return (
    <Flex color="#333">
      <Image src={track.image} width="92px" height="92px" objectFit="cover" />
      <Flex
        flex={1}
        margin="0 12px 0"
        height="92px"
        direction="column"
        justifyContent="center"
      >
        <Text fontSize={18} fontWeight="semibold" lineHeight="150%">
          {track.trackName}
        </Text>

        <Text fontSize={16} lineHeight="150%" margin="8px 0 0">
          {track.artistNames}
        </Text>
      </Flex>
      <Flex
        height="92px"
        direction="column"
        justifyContent="center"
        color="rgba(51,51,51,0.8)"
      >
        <Text>{timeutils.msToString(track.duration)}</Text>
      </Flex>
    </Flex>
  );
}

type Props = {
  tracks: Track[];
};

function Tracks({ tracks }: Props) {
  return (
    <Flex padding="32px 16px 0" direction="column" gap="16px">
      {tracks.map((track) => (
        <TrackItem key={track.trackId} track={track} />
      ))}
    </Flex>
  );
}

export default Tracks;
