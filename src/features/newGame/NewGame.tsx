import React, { createContext, useReducer } from 'react';

import { AnyAction } from '@reduxjs/toolkit';
import { Box, Heading, PageContent } from 'bumbag';

import { PlayerNamesForm } from './PlayerNamesForm';
import { SelectDealerForm } from './SelectDealerForm';
import { SettingsForm } from './SettingsForm';
import { reducer, initialState, NewGameState } from './slice';

interface NewGameContext {
  state: NewGameState;
  dispatch: React.Dispatch<AnyAction>;
}

const initialContext: NewGameContext = {
  state: initialState,
  dispatch: () => {
    return;
  },
};

export const newGameContext = createContext(initialContext);

const NewGame: React.FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <newGameContext.Provider value={{ state, dispatch }}>
      <Box>
        <PageContent>
          <Heading fontSize='2.5rem'>Oh Hell Scorecard</Heading>
          {state.displayIdx === 0 && <PlayerNamesForm />}
          {state.displayIdx === 1 && <SelectDealerForm />}
          {state.displayIdx === 2 && <SettingsForm />}
        </PageContent>
      </Box>
    </newGameContext.Provider>
  );
};

export default NewGame;
