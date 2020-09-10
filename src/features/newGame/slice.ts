import { createSlice } from '@reduxjs/toolkit';

import { defaultRequest, ScoringMode } from '../../shared/persistence/types';

interface IAction {
  type: string;
}

interface ISetPlayerNamesAction extends IAction {
  payload: string[];
}

interface ISelectDealerAction extends IAction {
  payload: string;
}

interface ISetScoringModeAction extends IAction {
  payload: ScoringMode;
}

const newGameSlice = createSlice({
  name: 'newGame',
  initialState: defaultRequest,
  reducers: {
    setPlayerNames(state, action: ISetPlayerNamesAction) {
      state.playerNames = action.payload;
    },
    selectDealer(state, action: ISelectDealerAction) {
      if (!state.playerNames.includes(action.payload)) {
        return state;
      }
      state.dealer = action.payload;
    },
    unselectDealer(state) {
      state.dealer = '';
    },
    toggleBonusRounds(state) {
      state.settings.bonusRounds = !state.settings.bonusRounds;
    },
    setScoringMode(state, action: ISetScoringModeAction) {
      state.settings.scoringMode = action.payload;
    },
  },
});

export const { actions, reducer } = newGameSlice;
