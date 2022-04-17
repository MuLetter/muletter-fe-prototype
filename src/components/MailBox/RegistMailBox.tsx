import { Button, Icon, Text } from "@chakra-ui/react";
import { BsMailbox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type Props = {
  type?: "button" | "submit";
};

function RegistMailBox({ type = "button" }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      type={type}
      position="fixed"
      bottom="80px"
      right="80px"
      background="transparent"
      color="white"
      border="1px solid white"
      borderRadius={48}
      filter="drop-shadow(2px 2px 2px rgba(55,55,55,0.3))"
      onClick={
        type === "submit" ? undefined : () => navigate("/mailbox/regist")
      }
    >
      <Icon as={BsMailbox} w="28px" h="28px" />
      <Text fontSize="14px" margin="0 0 0 8px">
        우체통 등록하기
      </Text>
    </Button>
  );
}

export default RegistMailBox;
