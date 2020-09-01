import React from 'react';

import { faPlus, faMinus, faArrowRight, faArrowLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';

import { NewGame } from './features/newGame/NewGame';
import { INewGameRequest } from './features/shared/newGame/types';

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
  const handleCreateGame = (state: INewGameRequest) => {
    console.log('Creating game...');
    const { playerNames, dealer, settings } = state;
    console.log({ playerNames, dealer, settings });
  };
  return (
    <BumbagProvider theme={theme}>
      <NewGame minPlayers={3} maxPlayers={10} handleCreateGame={handleCreateGame} />
    </BumbagProvider>
  );
};

export default App;
