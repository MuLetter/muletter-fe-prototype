import { Box } from "@chakra-ui/react";
import React from "react";

export function ContainerMar80({ children }: React.PropsWithChildren<any>) {
  return (
    <Box margin="0 80px 0" width="calc(100% - 160px)" minWidth="1280px">
      {children}
    </Box>
  );
}
export function ContainerMar32({ children }: React.PropsWithChildren<any>) {
  return <Box margin="0 32px 0">{children}</Box>;
}
export function ContainerMar24({ children }: React.PropsWithChildren<any>) {
  return <Box margin="0 24px 0">{children}</Box>;
}
export function ContainerMar16({
  children,
  ...props
}: React.PropsWithChildren<any>) {
  return (
    <Box margin="0 16px 0" {...props}>
      {children}
    </Box>
  );
}

export function ContainerBG() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      background="rgba(51, 51, 51, 0.25)"
    />
  );
}
