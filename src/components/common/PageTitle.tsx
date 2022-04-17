import React from "react";
import { Box, Flex, Text, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const aniLine = keyframes`
  0% {
    transform: scaleX(0);
  } 100% {
    transform: scaleX(1);
  }
`;

export function ContentTitle({
  children,
  ...props
}: React.PropsWithChildren<any>) {
  const refTitle = React.useRef<HTMLHeadingElement>(null);
  const [lineWidth, setLineWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (refTitle && refTitle.current) {
      const { width } = refTitle.current.getBoundingClientRect();

      setLineWidth(width + 100);
    }
  }, []);

  return (
    <Flex
      position="relative"
      color="white"
      height="64px"
      alignItems="center"
      {...props}
    >
      <Text
        ref={refTitle}
        as="h1"
        fontSize={18}
        fontWeight="medium"
        lineHeight="125%"
        padding="0 16px"
      >
        {children}
      </Text>
      {lineWidth && (
        <Box
          as={motion.div}
          position="absolute"
          width={`${lineWidth}px`}
          height="2px"
          left={0}
          bottom={0}
          background="linear-gradient(90deg, #fff, rgba(255,255,255,0) 100%)"
          animation={`${aniLine} 0.5s cubic-bezier(0, 0, 0, 1)`}
          transformOrigin="0% 0%"
        />
      )}
    </Flex>
  );
}
