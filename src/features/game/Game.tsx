import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { NewGameContext } from '../../shared/newGame/context';
import { defaultRequest } from '../../shared/newGame/types';

export const Game: React.FunctionComponent = () => {
  const { request: newGameRequest } = useContext(NewGameContext);
  const history = useHistory();

  useEffect(() => {
    if (newGameRequest === defaultRequest) {
      history.push('/');
    }
  }, [newGameRequest, history]);

  return <div>{newGameRequest === defaultRequest ? '' : JSON.stringify(newGameRequest)}</div>;
};
