import React from 'react';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';

import Home from './features/home/Home';

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

const App: React.FunctionComponent = () => {
  return (
    <BumbagProvider theme={theme}>
      <Home />
    </BumbagProvider>
  );
};

export default App;
