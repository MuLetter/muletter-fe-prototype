import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styled, { css } from "styled-components";
import assets from "../../assets";

function SearchTrack() {
  const [isSearch, setIsSearch] = React.useState<boolean>(false);

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
          <SearchInput type="text" placeholder="검색어를 입력해주세요." />
        ) : (
          <Text fontSize="18px" fontWeight="medium" flex={1}>
            편지로 받고 싶은 노래와 유사한 노래들을 등록해주세요.
          </Text>
        )}

        <Button
          type="button"
          onClick={() => setIsSearch((state) => !state)}
          isSearch={isSearch}
        >
          <AiOutlinePlus size="28px" />
        </Button>
      </Flex>
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

export default SearchTrack;
