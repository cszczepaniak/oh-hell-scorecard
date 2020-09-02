import { createContext } from 'react';

import { INewGameRequest, defaultRequest } from './types';

interface INewGameContextValues {
  request: INewGameRequest;
  setRequest: (req: INewGameRequest) => void;
}

export const NewGameContext = createContext<INewGameContextValues>({
  request: defaultRequest,
  setRequest: () => {
    throw Error('context is not implemented');
  },
});
