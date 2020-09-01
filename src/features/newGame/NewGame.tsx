import React, { useReducer, useState } from 'react';

import { Box, Heading, PageContent } from 'bumbag';

import { defaultRequest } from '../shared/newGame/types';
import { NewGameConfigContext, DisplayContext } from './context';
import { PlayerNamesForm } from './PlayerNamesForm';
import { SelectDealerForm } from './SelectDealerForm';
import { SettingsForm } from './SettingsForm';
import { reducer } from './slice';
import { INewGameState } from './types';

interface INewGameProps {
  minPlayers: number;
  maxPlayers: number;
  handleCreateGame: (state: INewGameState) => void;
}

export const NewGame: React.FunctionComponent<INewGameProps> = ({ minPlayers, maxPlayers, handleCreateGame }) => {
  const [state, dispatch] = useReducer(reducer, defaultRequest);
  const [displayIdx, setDisplayIdx] = useState(0);
  const incrementIdx = () => {
    setDisplayIdx(displayIdx + 1);
  };
  const decrementIdx = () => {
    setDisplayIdx(displayIdx - 1);
  };

  return (
    <NewGameConfigContext.Provider value={{ state, dispatch }}>
      <DisplayContext.Provider value={{ displayIdx, next: incrementIdx, previous: decrementIdx }}>
        <Box>
          <PageContent>
            <Heading>Oh Hell Scorecard</Heading>
            {displayIdx === 0 && <PlayerNamesForm minPlayers={minPlayers} maxPlayers={maxPlayers} />}
            {displayIdx === 1 && <SelectDealerForm />}
            {displayIdx === 2 && <SettingsForm handleCreateGame={handleCreateGame} />}
          </PageContent>
        </Box>
      </DisplayContext.Provider>
    </NewGameConfigContext.Provider>
  );
};
