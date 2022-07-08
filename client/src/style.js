import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#ffecb3",
    },
    success: {
      main: "#00e676",
    },
    error: {
      main: "#ff5252",
    },
    newTranForm: {
      main: "#ffe0b2",
    },
    background: {
      paper: "#263238",
    },
    cardFontColor: "#fff",
    divider: "#fff",

    // text: { primary: "#fff" },
  },
  typography: {
    fontFamily: "Fira Sans",

    balance: {
      fontSize: "2rem",
    },
  },
});
