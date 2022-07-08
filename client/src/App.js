import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./style";
import { GlobalContextProvider } from "./Context/GlobalState";
import { AuthContextProvider } from "./Context/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const matches = useMediaQuery("(max-width:500px)");

  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {matches ? (
              <MainRouter />
            ) : (
              <h3>
                Not Available in large screen yet. Switch to small screen.
              </h3>
            )}
          </ThemeProvider>
        </BrowserRouter>
      </GlobalContextProvider>
    </AuthContextProvider>
  );
}

export default App;
