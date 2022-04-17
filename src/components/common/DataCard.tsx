import React from "react";
import { Box, Text } from "@chakra-ui/react";
import CountUp from "react-countup";

type Props = {
  title: string;
  preText: string;
  quantity: number | null;
};

function DataCard({ title, quantity, preText }: Props) {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const topLineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.clientWidth;
      if (topLineRef.current)
        topLineRef.current.style.width = `${354 - titleWidth - 20}px`;
    }
  }, []);

  return (
    <Box
      className="datacard"
      width="354px"
      height="172px"
      boxSizing="border-box"
      border="1px solid #fff"
      borderTop="none"
      position="relative"
      color="#fff"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        ref={titleRef}
        fontSize="20px"
        position="absolute"
        top="-15px"
        left="10px"
        fontWeight="medium"
      >
        {title}
      </Text>
      <Text
        fontWeight={500}
        fontSize="56px"
        maxWidth="290px"
        textAlign="center"
      >
        {quantity && (
          <>
            <CountUp
              start={quantity * 0.25}
              end={quantity}
              duration={0.5}
              separator=","
              redraw
            />
            {`${preText}`}
          </>
        )}
      </Text>
      <Box
        ref={topLineRef}
        height="1px"
        position="absolute"
        top={0}
        right={0}
        background="white"
      />
    </Box>
  );
}

export default DataCard;
