import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import game from '../features/game/game-state';

const rootReducer = combineReducers({ game });

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
