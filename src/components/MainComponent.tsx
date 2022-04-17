import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import assets from "../assets";
import DataCard from "./common/DataCard";
import Letter from "./symbol/Letter";

type Props = {
  mailCount: number | null;
  mailBoxCount: number | null;
};

function MainComponent({ mailCount, mailBoxCount }: Props) {
  const scrollEvent = React.useCallback(() => {
    const allScroll = document.body.scrollHeight;
    const windowSize = window.innerHeight;
    const scrollRate = 300;
    const secondScrollRate = 105;

    const maxScrollY = allScroll - windowSize;
    const scrollY = window.scrollY;

    const elLetterLid = document.querySelector(".letter-lid") as HTMLDivElement;
    const elLetterFront = document.querySelector(
      ".letter-front"
    ) as HTMLDivElement;
    const elLetterPaper = document.querySelector(
      ".letter-paper"
    ) as HTMLDivElement;

    if (elLetterLid && elLetterFront && elLetterPaper) {
      if (scrollY <= scrollRate) {
        elLetterLid.style.transform =
          "rotateX(" + (scrollY / scrollRate) * 270 + "deg)";
        elLetterLid.style.zIndex = "";
        elLetterFront.style.zIndex = "";
        elLetterPaper.style.zIndex = "";
        elLetterPaper.style.transform = "";
      }
      if (scrollY > secondScrollRate) {
        elLetterLid.style.zIndex = "1";
        elLetterFront.style.zIndex = "3";
        elLetterPaper.style.zIndex = "2";
        elLetterPaper.style.transform =
          "translateY(-" +
          ((scrollY - secondScrollRate) / (maxScrollY - secondScrollRate)) *
            200 +
          "px)";
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  return (
    <Flex align="center" marginTop="48px" direction="column" height="1400px">
      <img
        src={assets.Logo.BigLogox3}
        alt="MuLetter Main Logo"
        style={{
          width: "266px",
        }}
      />
      <Text color="white" fontSize="28px" fontWeight="regular" marginTop="12px">
        오직 당신만을 위한 음악편지
      </Text>
      <Flex
        marginTop="72px"
        sx={{
          "& > .datacard:first-of-type": {
            marginRight: "32px",
          },
        }}
      >
        <DataCard title="작성 편지 수" quantity={mailCount} preText="장" />
        <DataCard title="우체통 등록 수" quantity={mailBoxCount} preText="개" />
      </Flex>
      <Letter />
    </Flex>
  );
}

export default MainComponent;
