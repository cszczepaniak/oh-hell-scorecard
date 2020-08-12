import React from 'react';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';

import NewGame from './features/newGame/NewGame';

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
      <NewGame />
    </BumbagProvider>
  );
};

export default App;
