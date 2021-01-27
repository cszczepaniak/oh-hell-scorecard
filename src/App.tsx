import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './features/newGame/Home';
import { PlayerNamesForm } from './features/newGame/PlayerNamesForm';
import { store } from './redux/root';

const App: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/newGame'>
                        <PlayerNamesForm minPlayers={3} maxPlayers={10} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
