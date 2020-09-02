import React, { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import { NewGameContext } from '../../shared/newGame/context';
import { defaultRequest } from '../../shared/newGame/types';

export const Game: React.FunctionComponent = () => {
  const { request: newGameRequest } = useContext(NewGameContext);

  return newGameRequest === defaultRequest ? <Redirect to='/' /> : <div>{JSON.stringify(newGameRequest)}</div>;
};
