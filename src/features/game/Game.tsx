import React, { useContext } from 'react';

import { NewGameContext } from '../../shared/newGame/context';

export const Game: React.FunctionComponent = () => {
  const { request: newGameRequest } = useContext(NewGameContext);

  return <div>{JSON.stringify(newGameRequest)}</div>;
};
