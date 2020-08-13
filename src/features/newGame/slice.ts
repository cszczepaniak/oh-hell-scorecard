import { createSlice } from '@reduxjs/toolkit';

export interface GameSettings {
  scoringMode: 'standard' | 'negative';
  bonusRounds: boolean;
}

export interface NewGameState {
  displayIdx: number;
  playerNames: string[];
  dealer: string;
  settings: GameSettings;
}

export const initialState: NewGameState = {
  displayIdx: 0,
  playerNames: [],
  dealer: '',
  settings: {
    scoringMode: 'negative',
    bonusRounds: true,
  },
};

const newGameSlice = createSlice({
  name: 'newGame',
  initialState: initialState,
  reducers: {
    incrementIdx(state) {
      state.displayIdx++;
    },
    decrementIdx(state) {
      state.displayIdx--;
    },
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
  },
});

export const { actions, reducer } = newGameSlice;
