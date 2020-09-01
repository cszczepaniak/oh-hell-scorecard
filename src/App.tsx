import React from 'react';

import { faPlus, faMinus, faArrowRight, faArrowLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';

import { NewGame } from './features/newGame/NewGame';
import { NewGameContainer } from './shared/newGame/NewGameContainer';

const theme: ThemeConfig = {
  Icon: {
    iconSets: [
      {
        icons: [faPlus, faMinus, faArrowRight, faArrowLeft, faQuestionCircle],
        prefix: 'solid-',
        type: 'font-awesome',
      },
      // {
      //   icons: [faPlus, faMinus],
      //   prefix: 'regular-',
      //   type: 'font-awesome',
      // },
    ],
  },
};

const App: React.FunctionComponent = () => {
  return (
    <BumbagProvider theme={theme}>
      <NewGameContainer>
        <NewGame minPlayers={3} maxPlayers={10} />
      </NewGameContainer>
    </BumbagProvider>
  );
};

export default App;
