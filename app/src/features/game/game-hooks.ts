import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/root';
import {
    Game,
    initializePlayers,
    ScoringMode,
    setBonusRounds,
    setDealer,
    setPlayerNames,
    setScoringMode,
    unsetDealer,
} from './game';

interface UseGameReturnType {
    game: Game;
    initializePlayers: () => void;
    setBonusRounds: (setting: boolean) => void;
    setDealer: (dealerName: string) => void;
    setPlayerNames: (names: string[]) => void;
    setScoringMode: (scoringMode: ScoringMode) => void;
    unsetDealer: () => void;
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
    };
};
