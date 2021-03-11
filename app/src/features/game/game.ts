import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScoringMode = 'Standard' | 'Negative';

type Phase = 'Bidding' | 'Scoring';

export interface Player {
    name: string;
    score: number;
    currentBid: number;
    currentTricks: number;
}

export interface Game {
    playerNames: string[];
    players: Player[];
    phase: Phase;
    round: number;
    numberOfCards: number;
    dealer: string;
    settings: {
        scoringMode: ScoringMode;
        bonusRounds: boolean;
    };
}

const initialState: Game = {
    playerNames: ['', '', '', ''],
    players: [],
    phase: 'Bidding',
    round: 1,
    numberOfCards: 1,
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
        togglePhase(state) {
            if (state.phase === 'Bidding') {
                state.phase = 'Scoring';
                return;
            }
            state.phase = 'Bidding';
        },
        initializePlayers(state) {
            const names = [...state.playerNames];
            const players: Player[] = [];
            names.forEach(name => players.push({ name, score: 0, currentBid: 0, currentTricks: 0 }));
            return { ...state, players };
        },
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

export const {
    initializePlayers,
    setBonusRounds,
    setDealer,
    setPlayerNames,
    setScoringMode,
    togglePhase,
    unsetDealer,
} = gameSlice.actions;
export default gameSlice.reducer;
