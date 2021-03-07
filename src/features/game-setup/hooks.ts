import { useSelector } from 'react-redux';

import { RootState } from '../../redux/root';
import { ScoringMode } from '../game/game';
import { useGame } from '../game/game-hooks';

interface UsePlayerNamesReturnType {
    playerNames: string[];
    setPlayerNames: (playerNames: string[]) => void;
}

export const usePlayerNames = (): UsePlayerNamesReturnType => {
    const {
        game: { playerNames },
        setPlayerNames,
    } = useGame();
    return { playerNames, setPlayerNames };
};

interface UseDealerReturnType {
    dealer: string;
    setDealer: (dealerName: string) => void;
    unsetDealer: () => void;
}

export const useDealer = (): UseDealerReturnType => {
    const {
        game: { dealer },
        setDealer,
        unsetDealer,
    } = useGame();
    return { dealer, setDealer, unsetDealer };
};

interface UseGameSettingsReturnType {
    bonusRounds: boolean;
    setBonusRounds: (val: boolean) => void;
    scoringMode: ScoringMode;
    setScoringMode: (val: ScoringMode) => void;
}

export const useGameSettings = (): UseGameSettingsReturnType => {
    const { setBonusRounds, setScoringMode } = useGame();
    const { bonusRounds, scoringMode } = useSelector((state: RootState) => state.game.settings);
    return {
        bonusRounds,
        setBonusRounds,
        scoringMode,
        setScoringMode,
    };
};
