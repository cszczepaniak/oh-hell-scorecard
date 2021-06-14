import React, { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { SelectDealerForm } from './features/game-setup/dealer/SelectDealerForm';
import { PlayerNamesForm } from './features/game-setup/players/PlayerNamesForm';
import { SettingsForm } from './features/game-setup/settings/SettingsForm';
import { Game } from './features/game/Game';
import { store } from './redux/root';

const App: React.FunctionComponent = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='w-full bg-white sm:bg-gray-50' style={{ height: windowHeight }}>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/newGame'>
                            <PlayerNamesForm minPlayers={3} maxPlayers={10} />
                        </Route>
                        <Route exact path='/selectDealer'>
                            <SelectDealerForm />
                        </Route>
                        <Route exact path='/gameSettings'>
                            <SettingsForm />
                        </Route>
                        <Route exact path='/game'>
                            <Game />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
