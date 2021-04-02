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
        setRoundNumber(state, action: PayloadAction<number>) {
            state.round = action.payload;
        },
        setNumberOfCards(state, action: PayloadAction<number>) {
            state.numberOfCards = action.payload;
        },
        setBids(state, action: PayloadAction<number[]>) {
            if (action.payload.length !== state.players.length) {
                return state;
            }
            state.players = action.payload.map((b, i) => ({ ...state.players[i], currentBid: b }));
        },
        setTrick: {
            prepare: (tricks: number, i: number) => ({ payload: { tricks, i } }),
            reducer: (state, action: PayloadAction<{ tricks: number; i: number }>) => {
                if (action.payload.i >= state.players.length) {
                    return state;
                }
                state.players[action.payload.i].currentTricks = action.payload.tricks;
            },
        },
        setBid: {
            prepare: (bid: number, i: number) => ({ payload: { bid, i } }),
            reducer: (state, action: PayloadAction<{ bid: number; i: number }>) => {
                if (action.payload.i >= state.players.length) {
                    return state;
                }
                state.players[action.payload.i].currentBid = action.payload.bid;
            },
        },
        setTricks(state, action: PayloadAction<number[]>) {
            if (action.payload.length !== state.players.length) {
                return state;
            }
            state.players = action.payload.map((t, i) => ({ ...state.players[i], currentTricks: t }));
        },
        scoreRound(state, action: PayloadAction<number[]>) {
            if (action.payload.length !== state.players.length) {
                return state;
            }
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].score += action.payload[i];
            }
        },
    },
});

export const {
    initializePlayers,
    setBonusRounds,
    setDealer,
    setPlayerNames,
    setRoundNumber,
    setNumberOfCards,
    setTrick,
    setTricks,
    setBid,
    setBids,
    scoreRound,
    setScoringMode,
    togglePhase,
    unsetDealer,
} = gameSlice.actions;
export default gameSlice.reducer;
