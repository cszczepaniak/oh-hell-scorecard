import React from 'react';

import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

import { NewGameContainer } from '../../../shared/newGame/NewGameContainer';
import { Game } from '../Game';

interface IRouterTestComponentProps {
  history: MemoryHistory;
}

const RouterTestComponent: React.FunctionComponent<IRouterTestComponentProps> = ({ history }) => (
  <NewGameContainer>
    <Router history={history}>
      <Switch>
        <Route exact path='/'>
          <div>HOME PAGE</div>
        </Route>
        <Route exact path='/game'>
          <Game />
        </Route>
      </Switch>
    </Router>
  </NewGameContainer>
);

test('navigating to /game with default request redirects to the home page', async () => {
  const history = createMemoryHistory();
  const { rerender } = render(<RouterTestComponent history={history} />);
  expect(screen.getByText(/^HOME/)).toHaveTextContent('HOME PAGE');
  act(() => {
    history.push('/game');
  });
  rerender(<RouterTestComponent history={history} />);
  // have been redirected to home?
  expect(screen.getByText(/^HOME/)).toHaveTextContent('HOME PAGE');
});
