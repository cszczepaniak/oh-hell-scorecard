import { useDispatch, useSelector } from 'react-redux';

import { getNumberOfCards } from '../../lib/game/rounds';
import { calculateScores } from '../../lib/game/scoring';
import { RootState } from '../../redux/root';
import {
    Game,
    ScoringMode,
    scoreRound,
    setBids,
    setBonusRounds,
    setNumberOfCards,
    setRoundNumber,
    setScoringMode,
    setTricks,
    unsetDealer,
    setBid,
    setTrick,
    setPlayerName,
    setDealerIndex,
    addPlayer,
    removePlayerAt,
} from './game';

interface UseGameReturnType {
    game: Game;
    addPlayer: (name: string) => void;
    removePlayerAt: (i: number) => void;
    setBonusRounds: (setting: boolean) => void;
    setDealerIndex: (i: number) => void;
    setPlayerName: (name: string, i: number) => void;
    setScoringMode: (scoringMode: ScoringMode) => void;
    unsetDealer: () => void;
    incrementRound: () => void;
    setBid: (bids: number, i: number) => void;
    setBids: (bids: number[]) => void;
    setTrick: (tricks: number, i: number) => void;
    setTricks: (tricks: number[]) => void;
    submitRound: () => void;
}

export const useGame = (): UseGameReturnType => {
    const game: Game = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();
    return {
        game,
        addPlayer: (name: string) => dispatch(addPlayer(name)),
        removePlayerAt: (i: number) => dispatch(removePlayerAt(i)),
        setBonusRounds: (setting: boolean) => dispatch(setBonusRounds(setting)),
        setScoringMode: (scoringMode: ScoringMode) => dispatch(setScoringMode(scoringMode)),
        setDealerIndex: (i: number) => {
            dispatch(setDealerIndex(i));
        },
        setPlayerName: (name: string, i: number) => dispatch(setPlayerName(name, i)),
        unsetDealer: () => {
            dispatch(unsetDealer());
        },
        incrementRound: () => {
            const nextRound = game.round + 1;
            dispatch(setRoundNumber(nextRound));
            dispatch(setNumberOfCards(getNumberOfCards(game.players.length, nextRound)));
        },
        setBid: (bid: number, i: number) => dispatch(setBid(bid, i)),
        setBids: (bids: number[]) => dispatch(setBids(bids)),
        setTrick: (trick: number, i: number) => dispatch(setTrick(trick, i)),
        setTricks: (tricks: number[]) => dispatch(setTricks(tricks)),
        submitRound: () => {
            const scores = calculateScores(game);
            dispatch(scoreRound(scores));
            const dealerIdx = (game.dealerIndex + 1) % game.players.length;
            dispatch(setDealerIndex(dealerIdx));
        },
    };
};
