import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import GlobalTheme from "./global";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    config,
  },
  GlobalTheme
);

export default theme;
