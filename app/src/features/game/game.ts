import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScoringMode = 'Standard' | 'Negative';

export interface Player {
    name: string;
    score: number;
    currentBid: number;
    currentTricks: number;
}

export interface Game {
    players: Player[];
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
        addPlayer(state, action: PayloadAction<string>) {
            state.players.push({ name: action.payload, score: 0, currentBid: 0, currentTricks: 0 });
        },
        removePlayerAt(state, action: PayloadAction<number>) {
            if (state.dealerIndex === action.payload) {
                unsetDealer();
            }
            state.players = state.players.filter((_, i) => i !== action.payload);
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
        unsetDealer(state) {
            state.dealerIndex = -1;
        },
        setBonusRounds(state, action: PayloadAction<boolean>) {
            state.settings.bonusRounds = action.payload;
        },
        setScoringMode(state, action: PayloadAction<ScoringMode>) {
            state.settings.scoringMode = action.payload;
        },
        setRoundNumber(state, action: PayloadAction<number>) {
            state.round = action.payload;
        },
        setNumberOfCards(state, action: PayloadAction<number>) {
            state.numberOfCards = action.payload;
        },
        resetBids(state) {
            state.players = state.players.map(p => ({ ...p, currentBid: 0 }));
        },
        resetTricks(state) {
            state.players = state.players.map(p => ({ ...p, currentTricks: 0 }));
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
    // player stuff
    addPlayer,
    removePlayerAt,
    setPlayerName,
    setDealerIndex,
    unsetDealer,
    // settings stuff
    setBonusRounds,
    setScoringMode,
    // game stuff
    setRoundNumber,
    setNumberOfCards,
    setTrick,
    setBid,
    resetBids,
    resetTricks,
    scoreRound,
} = gameSlice.actions;
export default gameSlice.reducer;
