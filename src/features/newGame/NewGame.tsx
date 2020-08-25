import React, { useReducer, useState } from 'react';

import { Box, Heading, PageContent } from 'bumbag';

import { NewGameContext, DisplayContext } from './context';
import { PlayerNamesForm } from './PlayerNamesForm';
import { SelectDealerForm } from './SelectDealerForm';
import { SettingsForm } from './SettingsForm';
import { reducer, initialState } from './slice';

interface INewGameProps {
  minPlayers: number;
  maxPlayers: number;
}

export const NewGame: React.FunctionComponent<INewGameProps> = ({ minPlayers, maxPlayers }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [displayIdx, setDisplayIdx] = useState(0);
  const incrementIdx = () => {
    setDisplayIdx(displayIdx + 1);
  };
  const decrementIdx = () => {
    setDisplayIdx(displayIdx - 1);
  };

  return (
    <NewGameContext.Provider value={{ state, dispatch }}>
      <DisplayContext.Provider value={{ displayIdx, next: incrementIdx, previous: decrementIdx }}>
        <Box>
          <PageContent>
            <Heading>Oh Hell Scorecard</Heading>
            {displayIdx === 0 && <PlayerNamesForm minPlayers={minPlayers} maxPlayers={maxPlayers} />}
            {displayIdx === 1 && <SelectDealerForm />}
            {displayIdx === 2 && <SettingsForm />}
          </PageContent>
        </Box>
      </DisplayContext.Provider>
    </NewGameContext.Provider>
  );
};
