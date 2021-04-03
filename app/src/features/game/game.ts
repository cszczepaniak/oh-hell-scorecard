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
    players: Player[];
    phase: Phase;
    round: number;
    numberOfCards: number;
    dealerIndex: number;
    settings: {
        scoringMode: ScoringMode;
        bonusRounds: boolean;
    };
}

const initialPlayer: Player = { name: '', score: 0, currentBid: 0, currentTricks: 0 };

const initialState: Game = {
    players: Array(4).fill({ ...initialPlayer }),
    phase: 'Bidding',
    round: 1,
    numberOfCards: 1,
    dealerIndex: -1,
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
        addPlayer(state, action: PayloadAction<string>) {
            state.players.push({ name: action.payload, score: 0, currentBid: 0, currentTricks: 0 });
        },
        removePlayerAt(state, action: PayloadAction<number>) {
            if (state.dealerIndex === action.payload) {
                unsetDealer();
            }
            state.players = state.players.filter((_, i) => i !== action.payload);
        },
        setBonusRounds(state, action: PayloadAction<boolean>) {
            state.settings.bonusRounds = action.payload;
        },
        setDealerIndex(state, action: PayloadAction<number>) {
            state.dealerIndex = action.payload;
        },
        setPlayerName: {
            prepare: (name: string, i: number) => ({ payload: { name, i } }),
            reducer: (state, action: PayloadAction<{ name: string; i: number }>) => {
                if (action.payload.i >= state.players.length) {
                    return state;
                }
                state.players[action.payload.i].name = action.payload.name;
            },
        },
        setScoringMode(state, action: PayloadAction<ScoringMode>) {
            state.settings.scoringMode = action.payload;
        },
        unsetDealer(state) {
            state.dealerIndex = -1;
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
    addPlayer,
    removePlayerAt,
    setBonusRounds,
    setDealerIndex,
    setPlayerName,
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
