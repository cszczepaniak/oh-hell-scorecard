import React, { useReducer } from 'react';

import { Box, Heading, PageContent } from 'bumbag';

import { minPlayers, maxPlayers } from './constants';
import { NewGameContext } from './context';
import { PlayerNamesForm } from './PlayerNamesForm';
import { SelectDealerForm } from './SelectDealerForm';
import { SettingsForm } from './SettingsForm';
import { reducer, initialState } from './slice';

const NewGame: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewGameContext.Provider value={{ state, dispatch }}>
      <Box>
        <PageContent>
          <Heading>Oh Hell Scorecard</Heading>
          {state.displayIdx === 0 && <PlayerNamesForm minPlayers={minPlayers} maxPlayers={maxPlayers} />}
          {state.displayIdx === 1 && <SelectDealerForm />}
          {state.displayIdx === 2 && <SettingsForm />}
        </PageContent>
      </Box>
    </NewGameContext.Provider>
  );
};

export default NewGame;
