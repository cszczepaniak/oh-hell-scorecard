import React, { useState } from 'react';

import { NewGameContext } from './context';
import { INewGameRequest, defaultRequest } from './types';

export const NewGameContainer: React.FunctionComponent = ({ children }) => {
  const [newGameRequest, setNewGameRequest] = useState<INewGameRequest>(defaultRequest);
  return (
    <NewGameContext.Provider value={{ request: newGameRequest, setRequest: setNewGameRequest }}>
      {children}
    </NewGameContext.Provider>
  );
};
