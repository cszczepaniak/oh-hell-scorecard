import { createContext } from 'react';

import { AnyAction } from '@reduxjs/toolkit';

import { initialState, NewGameState } from './slice';

interface NewGameContextValues {
  state: NewGameState;
  dispatch: React.Dispatch<AnyAction>;
}

const initialContext: NewGameContextValues = {
  state: initialState,
  dispatch: () => {
    return;
  },
};

export const NewGameContext = createContext(initialContext);
