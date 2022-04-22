import { Avatar, AvatarGroup, Box } from "@chakra-ui/react";
import { Track } from "../../store/mailbox/types";

type Props = {
  tracks: Track[];
};

function TracksAvatar({ tracks }: Props) {
  return (
    <Box className="tracks-avatar">
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

export default TracksAvatar;
