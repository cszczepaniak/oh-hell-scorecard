import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../redux/root';
import { PlayerNamesForm } from './PlayerNamesForm';

describe('PlayerNamesForm', () => {
    test('dummy test for now TODO delete this', () => {
        render(
            <Provider store={store}>
                <PlayerNamesForm minPlayers={3} maxPlayers={10} />
            </Provider>,
        );
    });
});
