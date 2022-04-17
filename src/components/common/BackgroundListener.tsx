import { Box, Image } from "@chakra-ui/react";
import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  imagePath?: string;
  setLidStart: (state: boolean) => void;
  setPaperStart: (state: boolean) => void;
};

function BackgroundListener({ imagePath, setLidStart, setPaperStart }: Props) {
  const refImage = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (refImage && refImage.current) {
      refImage.current.onanimationend = (e) => {
        setTimeout(() => {
          setLidStart(true);
          setTimeout(() => {
            const elFront = document.querySelector(
              ".letter-front"
            ) as HTMLDivElement;
            if (elFront) elFront.style.zIndex = "3";
          }, 250);
          setTimeout(() => {
            setPaperStart(true);
          });
        }, 1300);
      };
    }
  }, [setLidStart, setPaperStart]);

  return (
    <Background id="background-listener">
      <Image
        ref={refImage}
        src={`${process.env.REACT_APP_API_SERVER}${imagePath}`}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        background="rgba(51,51,51, 0.3)"
        width="100%"
        height="100%"
      />
    </Background>
  );
}

const AniImage = keyframes`
    0% {
        opacity: 0;
    } 100% {
        opacity: 1;
    }
`;

const Background = styled.div`
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${AniImage} 0.35s ease-in-out;
  }
`;

export default BackgroundListener;
