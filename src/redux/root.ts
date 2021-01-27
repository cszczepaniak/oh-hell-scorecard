import { combineReducers, configureStore } from '@reduxjs/toolkit';

import game from './game';

const rootReducer = combineReducers({ game });

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
