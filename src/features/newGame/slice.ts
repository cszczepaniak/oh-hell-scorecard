import { createSlice } from '@reduxjs/toolkit';

import { INewGameState, ScoringMode } from './types';

export const initialState: INewGameState = {
  playerNames: [],
  dealer: '',
  settings: {
    scoringMode: ScoringMode.Negative,
    bonusRounds: true,
  },
};

const newGameSlice = createSlice({
  name: 'newGame',
  initialState: initialState,
  reducers: {
    setPlayerNames(state, action) {
      state.playerNames = action.payload;
    },
    selectDealer(state, action) {
      if (!action.payload || !state.playerNames.includes(action.payload)) {
        return;
      }
      state.dealer = action.payload;
    },
    unselectDealer(state) {
      state.dealer = '';
    },
    setSettings(state, action) {
      state.settings = action.payload;
    },
    toggleBonusRounds(state) {
      state.settings.bonusRounds = !state.settings.bonusRounds;
    },
    setScoringMode(state, action) {
      state.settings.scoringMode = action.payload;
    },
  },
});

export const { actions, reducer } = newGameSlice;
