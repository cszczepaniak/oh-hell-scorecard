import React from 'react';

import { faPlus, faMinus, faArrowRight, faArrowLeft, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Provider as BumbagProvider, ThemeConfig } from 'bumbag';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Game } from './features/game/Game';
import { NewGame } from './features/newGame/NewGame';
import { NewGameContainer } from './shared/newGame/NewGameContainer';

const theme: ThemeConfig = {
  Icon: {
    iconSets: [
      {
        icons: [faPlus, faMinus, faArrowRight, faArrowLeft, faQuestionCircle],
        prefix: 'solid-',
        type: 'font-awesome',
      },
      // {
      //   icons: [faPlus, faMinus],
      //   prefix: 'regular-',
      //   type: 'font-awesome',
      // },
    ],
  },
};

const App: React.FunctionComponent = () => {
  return (
    <BumbagProvider theme={theme}>
      <NewGameContainer>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <NewGame minPlayers={3} maxPlayers={10} />
            </Route>
            <Route exact path='/game'>
              <Game />
            </Route>
          </Switch>
        </BrowserRouter>
      </NewGameContainer>
    </BumbagProvider>
  );
};

export default App;
