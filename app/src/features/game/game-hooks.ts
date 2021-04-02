import { useDispatch, useSelector } from 'react-redux';

import { getNumberOfCards } from '../../lib/game/rounds';
import { calculateScores } from '../../lib/game/scoring';
import { RootState } from '../../redux/root';
import {
    Game,
    initializePlayers,
    ScoringMode,
    scoreRound,
    setBids,
    setBonusRounds,
    setDealer,
    setNumberOfCards,
    setPlayerNames,
    setRoundNumber,
    setScoringMode,
    setTricks,
    unsetDealer,
    setBid,
    setTrick,
} from './game';

interface UseGameReturnType {
    game: Game;
    initializePlayers: () => void;
    setBonusRounds: (setting: boolean) => void;
    setDealer: (dealerName: string) => void;
    setPlayerNames: (names: string[]) => void;
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
        initializePlayers: () => dispatch(initializePlayers()),
        setBonusRounds: (setting: boolean) => dispatch(setBonusRounds(setting)),
        setDealer: (dealerName: string) => dispatch(setDealer(dealerName)),
        setPlayerNames: (names: string[]) => dispatch(setPlayerNames(names)),
        setScoringMode: (scoringMode: ScoringMode) => dispatch(setScoringMode(scoringMode)),
        unsetDealer: () => dispatch(unsetDealer()),
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
            const scores = calculateScores(
                game.players.map(p => p.currentBid),
                game.players.map(p => p.currentTricks),
                game.numberOfCards,
                game.settings.bonusRounds,
            );
            dispatch(scoreRound(scores));
        },
    };
};
