import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScoringMode = 'Standard' | 'Negative';

export interface Game {
    playerNames: string[];
    dealer: string;
    settings: {
        scoringMode: ScoringMode;
        bonusRounds: boolean;
    };
}

const initialState: Game = {
    playerNames: ['', '', '', ''],
    dealer: '',
    settings: {
        scoringMode: 'Negative',
        bonusRounds: true,
    },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBonusRounds(state, action: PayloadAction<boolean>) {
            state.settings.bonusRounds = action.payload;
        },
        setDealer(state, action: PayloadAction<string>) {
            state.dealer = action.payload;
        },
        setPlayerNames(state, action: PayloadAction<string[]>) {
            state.playerNames = action.payload;
        },
        setScoringMode(state, action: PayloadAction<ScoringMode>) {
            state.settings.scoringMode = action.payload;
        },
        unsetDealer(state, _: PayloadAction<void>) {
            state.dealer = '';
        },
    },
});

export const { setBonusRounds, setDealer, setPlayerNames, setScoringMode, unsetDealer } = gameSlice.actions;
export default gameSlice.reducer;
