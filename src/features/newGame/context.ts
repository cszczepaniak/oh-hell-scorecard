import { createContext } from 'react';

import { AnyAction } from '@reduxjs/toolkit';

import { INewGameRequest, defaultRequest } from '../../shared/newGame/types';

interface INewGameConfigContextValues {
  state: INewGameRequest;
  dispatch: React.Dispatch<AnyAction>;
}

export const NewGameConfigContext = createContext<INewGameConfigContextValues>({
  state: defaultRequest,
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
