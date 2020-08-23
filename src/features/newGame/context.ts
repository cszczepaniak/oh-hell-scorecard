import { createContext } from 'react';

import { AnyAction } from '@reduxjs/toolkit';

import { initialState } from './slice';
import { INewGameState } from './types';

interface INewGameContextValues {
  state: INewGameState;
  dispatch: React.Dispatch<AnyAction>;
}

export const NewGameContext = createContext<INewGameContextValues>({
  state: initialState,
  dispatch: () => {
    return;
  },
});

interface IDisplayContextValues {
  displayIdx: number;
  next: () => void;
  previous: () => void;
}

export const DisplayContext = createContext<IDisplayContextValues>({
  displayIdx: 0,
  next: () => {
    return;
  },
  previous: () => {
    return;
  },
});
