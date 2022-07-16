import React from 'react';
import 'regenerator-runtime/runtime';
import Routes from './Routes';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
// import Navbar from './components/Navbar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Navbar /> */}
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
