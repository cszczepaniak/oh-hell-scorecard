import { createContext } from 'react';

import { AnyAction } from '@reduxjs/toolkit';

import { INewGameRequest, defaultRequest } from '../../shared/persistence/types';

interface INewGameConfigContextValues {
  state: INewGameRequest;
  dispatch: React.Dispatch<AnyAction>;
}

export const NewGameConfigContext = createContext<INewGameConfigContextValues>({
  state: defaultRequest,
  dispatch: () => {
    throw Error('context is not implemented');
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
    throw Error('context is not implemented');
  },
  previous: () => {
    throw Error('context is not implemented');
  },
});
