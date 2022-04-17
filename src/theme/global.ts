const GlobalTheme = {
  fonts: {
    body: "'Spoqa Han Sans Neo', 'sans-serif'",
    heading: "'Spoqa Han Sans Neo', 'sans-serif'",
    mono: "'Spoqa Han Sans Neo', 'sans-serif'",
  },
  styles: {
    global: (props: any) => ({
      html: {
        background: "linear-gradient(90deg, #4568DC 0%, #B06AB3 100%);",
      },
      body: {
        background: "transparent",
        width: "100vw",
        height: "100vh",
      },
      "*": {
        msOverflowStyle: "none",
      },
      "*::-webkit-scrollbar": {
        display: "none",
      },
      ".chakra-alert": {
        background: "#121215 !important",
        color: "#fff !important",
      },
    }),
  },
};

export default GlobalTheme;
