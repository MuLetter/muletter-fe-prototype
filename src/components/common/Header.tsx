import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import assets from "../../assets";
import { ContainerMar80 } from "./Container";

function Header() {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={0}
      height={120}
      width="100vw"
      zIndex={255}
      sx={{
        "& .logo": {
          width: "150px",
          height: "27.33px",
        },
        "& > div": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}
      align="center"
      color="white"
    >
      <ContainerMar80>
        <Link to="/">
          <img
            src={assets.Logo["Logox3"]}
            alt="MuLetter Logo"
            className="logo"
          />
        </Link>
        <Flex
          as="ul"
          listStyleType="none"
          sx={{
            "& > a:first-of-type": {
              marginRight: "32px",
            },
            "& > a > li": {
              fontSize: "18px",
            },
          }}
        >
          <Link to="/mailbox">
            <Box as="li">우체통</Box>
          </Link>
          <Link to="/map">
            <Box as="li">지도</Box>
          </Link>
        </Flex>
      </ContainerMar80>
    </Flex>
  );
}

export default Header;
