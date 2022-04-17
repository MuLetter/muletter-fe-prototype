import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled, { css } from "styled-components";
import assets from "../../assets";
import { debounce } from "underscore";
import AuthConnector from "../../store/auth/connector";
import { ConnectedProps } from "react-redux";
import SpotifyAPI from "../../api/Spotify";
import { Track } from "../../store/mailbox/types";
import timeutils from "../../utils/timeutils";

type ItemProps = {
  mode: "select" | "general";
  track: Track;
  selectTrack: (track: Track) => void;
};

function TrackItem({ mode, track, selectTrack }: ItemProps) {
  return (
    <Flex
      width="calc(100% / 3 - 48px)"
      height="92px"
      alignItems="center"
      cursor={mode === "select" ? "pointer" : "default"}
      onClick={mode === "select" ? () => selectTrack(track) : undefined}
    >
      <Image src={track.image} margin="0 8px 0 0" width="80px" height="80px" />
      <Flex flex={1} direction="column" justifyContent="center">
        <Text fontSize="14px" fontWeight="semibold">
          {track.trackName}
        </Text>
        <Text fontSize="12px" fontWeight="regular" margin="4px 0 0">
          {track.artistNames}
        </Text>
      </Flex>
      <Text
        fontSize="12px"
        fontWeight="regular"
        margin="0 0 0 4px"
        color="rgba(255, 255, 255, 0.8)"
      >
        {timeutils.msToString(track.duration)}
      </Text>
    </Flex>
  );
}

type ListProps = {
  mode: "select" | "general";
  tracks: Track[];
  selectTrack: (track: Track) => void;
};

function TrackList({ mode, tracks, selectTrack }: ListProps) {
  return (
    <Flex rowGap="12px" direction="row" columnGap="48px" flexWrap="wrap">
      {tracks.map((track) => (
        <TrackItem
          key={track.trackId}
          mode={mode}
          track={track}
          selectTrack={selectTrack}
        />
      ))}
    </Flex>
  );
}

type Props = ConnectedProps<typeof AuthConnector>;

function SearchTrack({ spotify }: Props) {
  const toast = useToast();
  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [selTracks, setSelTracks] = React.useState<Track[]>([]);
  const [searchTracks, setSearchTracks] = React.useState<Track[]>([]);

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

  const generateTrackItem = React.useCallback((tracks: any) => {
    const items = tracks["items"];
    const _searchTracks: Track[] = [];

    items.forEach((item: any) => {
      const _searchTrack: { [key: string]: any } = {};
      _searchTrack["trackId"] = item["id"];
      _searchTrack["trackName"] = item["name"];
      _searchTrack["duration"] = item["duration_ms"];

      const album: any = item["album"];
      const images: Array<any> = album["images"];
      const artists: Array<any> = item["artists"];

      const image = images.length === 0 ? "" : images[0]["url"];

      let artistIds = "";
      let artistNames = "";
      artists.forEach((artist) => {
        artistIds += artist["id"] + ",";
        artistNames += artist["name"] + ",";
      });

      artistIds = artistIds.substring(0, artistIds.length - 1);
      artistNames = artistNames.substring(0, artistNames.length - 1);

      _searchTrack["artistIds"] = artistIds;
      _searchTrack["artistNames"] = artistNames;
      _searchTrack["image"] = image;

      _searchTracks.push(_searchTrack as Track);
    });

    setSearchTracks(_searchTracks);
  }, []);

  const requestQuery = React.useRef(
    debounce(async (q: string, token: string) => {
      if (q !== "") {
        try {
          const res = await SpotifyAPI.getSearch(q, token);
          generateTrackItem(res.data["tracks"]);
        } catch (err) {
          console.error(err);
        }
      }
    }, 750)
  );

  const modeChange = React.useCallback(() => {
    if (isSearch) {
      setQuery("");
      setSearchTracks([]);
    }
    setIsSearch(!isSearch);
  }, [isSearch]);

  const changeQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (spotify && spotify.access_token)
        requestQuery.current(e.target.value, spotify?.access_token);
    },
    [spotify]
  );

  return (
    <Flex direction="column">
      <Flex
        height="88px"
        alignItems="center"
        direction="row"
        justifyContent="space-between"
      >
        <SpotifyLogo
          src={assets["Icon"]["SpotifyIconWhitex3"]}
          className="spotify-logo"
          isSearch={isSearch}
        />
        {isSearch ? (
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요."
            value={query}
            onChange={changeQuery}
          />
        ) : (
          <Text fontSize="18px" fontWeight="medium" flex={1}>
            편지로 받고 싶은 노래와 유사한 노래들을 등록해주세요.
          </Text>
        )}

        <Button type="button" onClick={modeChange} isSearch={isSearch}>
          <AiOutlinePlus size="28px" />
        </Button>
      </Flex>
      {isSearch ? (
        <TrackList
          tracks={searchTracks}
          mode="select"
          selectTrack={selectTrack}
        />
      ) : (
        <TrackList
          tracks={selTracks}
          mode="general"
          selectTrack={selectTrack}
        />
      )}
    </Flex>
  );
}

const SearchInput = styled.input`
  flex: 1;
  background: transparent;

  font-weight: 700;
  font-size: 18px;

  outline: none;
`;

const SpotifyLogo = styled.img<{ isSearch: boolean }>`
  transition: 0.5s;

  ${(props) =>
    props.isSearch
      ? css`
          width: 48px;
          height: 48px;
          opacity: 1;
          margin: 0 16px 0 0;
        `
      : css`
          width: 0;
          height: 0;
          opacity: 0;
          margin: 0;
        `}
`;

const Button = styled.button<{ isSearch: boolean }>`
  background: "transparent";
  transition: 0.25s;

  ${(props) =>
    props.isSearch &&
    css`
      transform: rotateZ(135deg);
    `}
`;

export default AuthConnector(SearchTrack);
