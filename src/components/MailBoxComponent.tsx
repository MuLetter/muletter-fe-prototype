import { Box, Flex } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";
import styled, { css, keyframes } from "styled-components";
import assets from "../assets";
import { Mail, MailBox } from "../store/mailbox/types";
import BackgroundListener from "./common/BackgroundListener";
import { ContentTitle } from "./common/PageTitle";
import Tracks from "./common/Tracks";

type LetterProps = {
  mailBox: MailBox | null;
  mail: Mail | null;
  setViewTitle: (state: boolean) => void;
};

const LazyMarkerImage = lazy(() => import("./MailBox/MarkerImage"));

function Letter({ mailBox, mail, setViewTitle }: LetterProps) {
  const refBlock = React.useRef<HTMLDivElement>(null);
  const refMarker = React.useRef<HTMLDivElement>(null);
  const refLid = React.useRef<HTMLDivElement>(null);
  const refFront = React.useRef<HTMLDivElement>(null);
  const refPaper = React.useRef<HTMLDivElement>(null);

  const [paperEnd, setPaperEnd] = React.useState<boolean>(false);
  const [blockStart, setBlockStart] = React.useState<boolean>(false);
  const [paperStart, setPaperStart] = React.useState<boolean>(false);
  const [lidStart, setLidStart] = React.useState<boolean>(false);
  const [backLoading, setBackLoading] = React.useState<boolean>(false);
  const [markerStart, setMarkerStart] = React.useState<boolean>(false);
  const [markerLoading, setMarkerLoading] = React.useState<boolean>(false);

  // window resize
  // React.useEffect(() => {
  //   if (paperEnd) {
  //     window.onresize = (e) => {
  //       if (blockStart) {
  //         if (refBlock && refBlock.current) {
  //           const { bottom } = refBlock.current.getBoundingClientRect();
  //           const _translateY = 1184 - bottom;

  //           refBlock.current.style.transform =
  //             "translateY(" + _translateY + "px)";
  //           refBlock.current.style.transition = "";
  //         }
  //       }
  //     };
  //   }
  // }, [paperEnd]);

  // Infinite Scroll
  React.useEffect(() => {
    if (refPaper && refPaper.current) {
      refPaper.current.onscroll = (e) => {
        if (refPaper && refPaper.current) {
          const endScroll =
            refPaper!.current?.scrollHeight - refPaper!.current?.offsetHeight;
          const nowScroll = refPaper!.current!.scrollTop;
        }
      };
    }
  }, []);

  // paper animation end
  React.useEffect(() => {
    if (refPaper && refPaper.current) {
      refPaper.current.onanimationend = (e) => {};
    }
  }, []);

  React.useEffect(() => {
    if (blockStart) {
      if (refBlock && refBlock.current) {
        const { bottom } = refBlock.current.getBoundingClientRect();
        const _translateY = 1184 - bottom;

        refBlock.current.style.transform = "translateY(" + _translateY + "px)";
        refBlock.current.style.transition = "0.35s";

        refBlock.current.ontransitionend = (e) => {
          if (refBlock && refBlock.current)
            refBlock.current.style.transition = "";
          setViewTitle(true);
          setPaperEnd(true);
        };
      }
    }
  }, [blockStart, setViewTitle]);

  // marker animation listen
  React.useEffect(() => {
    if (refMarker && refMarker.current) {
      refMarker.current.onanimationend = (e) => {
        setBackLoading(true);
        if (refLid && refLid.current) {
          refLid.current.onanimationend = (e) => {
            setTimeout(() => {
              setBlockStart(true);
            }, 500);
          };
        }
      };
    }
  }, [markerLoading]);

  // 시작점
  React.useEffect(() => {
    if (markerLoading) {
      setTimeout(() => {
        setMarkerStart(true);
      }, 1000);
    }
  }, [markerLoading]);

  return (
    <>
      {backLoading && (
        <BackgroundListener
          imagePath={mailBox?.imagePath}
          setLidStart={setLidStart}
          setPaperStart={setPaperStart}
        />
      )}
      <LetterBlock ref={refBlock}>
        <LetterBack />
        <LetterPaper
          ref={refPaper}
          className="letter-paper"
          paperStart={paperStart}
        >
          {paperEnd && mail && <Tracks tracks={mail.tracks} />}
        </LetterPaper>

        <LetterFront ref={refFront} className="letter-front">
          <img src={assets.Item.LetterFrontx3} alt="Letter Front" />
        </LetterFront>

        <LetterLid ref={refLid} className="letter-lid" lidStart={lidStart}>
          <img src={assets.Item.LetterLidReversex3} alt="Letter Lid" />
        </LetterLid>

        <Suspense fallback={<></>}>
          <ImageMarker markerStart={markerStart} ref={refMarker}>
            <LazyMarkerImage
              src={mailBox?.imagePath}
              setMarkerLoading={setMarkerLoading}
            />
            <Box />
          </ImageMarker>
        </Suspense>
      </LetterBlock>
    </>
  );
}

const AniPaper = keyframes`
  0% {
    transform: scaleY(0);
    z-index: 1;
  }
  100% {
    transform: scaleY(1);
    z-index: 2;
  }
`;

const AniImageMarker = keyframes`
  0% {
    transform: translate(0);
    opacity: 1;
  } 60% {
    opacity: 0;
  } 100% {
    transform: translateY(-95px) rotateY(75deg);
    opacity: 0;
  }
`;

const AniLid = keyframes`
  0% {
    transform: rotateX(0);
  } 50% {
    z-index: 1;
  } 100% {
    z-index: 1;
    transform: rotateX(270deg);
  }
`;

const ImageMarker = styled(Box)<{ markerStart: boolean }>`
  position: absolute;
  top: calc(493.33px / 2 - 56px) !important;
  left: calc(740px / 2 - 32px) !important;
  transform-origin: 50% 50%;
  z-index: 1;
  ${(props) =>
    props.markerStart &&
    css`
      animation: ${AniImageMarker} 0.85s linear forwards;
    `}

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 100%;
    border: 2px solid #999;
    border: none;
  }

  & > img {
  }

  & > div {
    background-color: rgba(55, 55, 55, 0.7);
  }
`;

const LetterBlock = styled.div`
  position: relative;

  width: 740px;
  height: 493.33px;

  transform: translateY(-64px);

  & > div:not(.letter-paper) {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-end-start-radius: 16px;
    border-end-end-radius: 16px;
  }
`;

const LetterLid = styled.div<{ lidStart: boolean }>`
  height: calc(493.33px / 2) !important;

  transform-origin: 0% 0%;
  z-index: 1;
  ${(props) =>
    props.lidStart &&
    css`
      animation: ${AniLid} 0.4s ease-in forwards;
    `}

  & > img {
    filter: drop-shadow(0px 2px 1px rgba(55, 55, 55, 0.5));
  }
`;

const LetterFront = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  perspective: 500px;
  z-index: 1;

  & > img {
    filter: drop-shadow(-2px -2px 1px rgba(55, 55, 55, 0.5));
  }
`;

const LetterPaper = styled.div<{ paperStart: boolean }>`
  position: absolute;

  bottom: 0 !important;
  left: 10px !important;
  width: 720px !important;
  height: 1000px !important;
  padding: 0 0 100px 0;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: #fff;
  transform: scaleY(0);
  transform-origin: 100% 100%;

  /* transform: translateY(-145px); */
  ${(props) =>
    props.paperStart &&
    css`
      animation: ${AniPaper} 0.65s linear forwards;
    `}

  border-radius: 16px !important;
  /* z-index: 2; */

  box-shadow: 0px 0px 4px rgba(55, 55, 55, 0.5);
`;

const LetterBack = styled.div`
  background-color: #eee;
`;

type Props = {
  id?: string;
  mailBox: MailBox | null;
  mail: Mail | null;
};

function MailBoxComponent({ id, mailBox, mail }: Props) {
  const [viewTitle, setViewTitle] = React.useState<boolean>(false);
  return (
    <>
      {viewTitle ? (
        <ContentTitle position="relative" zIndex="3">
          {mailBox?.title}
        </ContentTitle>
      ) : (
        <Box height="64px" />
      )}
      <Flex
        height="calc(100vh - 120px)"
        justifyContent="center"
        alignItems="center"
        minHeight="1020px"
      >
        <Letter mail={mail} mailBox={mailBox} setViewTitle={setViewTitle} />
      </Flex>
    </>
  );
}

export default MailBoxComponent;
