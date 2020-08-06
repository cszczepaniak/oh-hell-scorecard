import React from 'react';
import Home from './features/home/Home';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const theme: ThemeConfig = {
  Icon: {
    iconSets: [
      {
        icons: [faPlus, faMinus],
        prefix: 'solid-',
        type: 'font-awesome',
      },
      {
        icons: [faPlus, faMinus],
        prefix: 'regular-',
        type: 'font-awesome',
      },
    ],
  },
};

const App = () => {
  return (
    <BumbagProvider theme={theme}>
      <Home />
    </BumbagProvider>
  );
};

export default App;
