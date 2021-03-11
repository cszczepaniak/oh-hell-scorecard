import React from 'react';

import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { PlayerNamesForm } from './features/game-setup/players/PlayerNamesForm';
import { SettingsForm } from './features/game-setup/settings/SettingsForm';
import { Game } from './features/game/Game';
import { store } from './redux/root';

const theme = createMuiTheme({
    palette: {
        background: {
            default: grey[100],
        },
    },
});

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <BrowserRouter>
                    <Container maxWidth='lg'>
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
                            <Route exact path='/game'>
                                <Game />
                            </Route>
                        </Switch>
                    </Container>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
