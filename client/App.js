import React from "react";
import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar />
      <Routes />
    </div>
    </ThemeProvider>
  );
};

export default App;
