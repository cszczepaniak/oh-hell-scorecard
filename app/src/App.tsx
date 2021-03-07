import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { PlayerNamesForm } from './features/game-setup/players/PlayerNamesForm';
import { SettingsForm } from './features/game-setup/settings/SettingsForm';
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
                    <Route exact path='/gameSettings'>
                        <SettingsForm />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
