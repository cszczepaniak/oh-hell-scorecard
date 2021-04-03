import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../redux/root';
import { ScoringMode } from '../game/game';
import { useGame } from '../game/game-hooks';

interface UsePlayerNamesReturnType {
    playerNames: string[];
    setPlayerName: (name: string, i: number) => void;
}

export const usePlayerNames = (): UsePlayerNamesReturnType => {
    const {
        game: { players },
        setPlayerName,
    } = useGame();
    const playerNames = useMemo(() => players.map(p => p.name), [players]);
    return { playerNames, setPlayerName };
};

interface UseDealerReturnType {
    dealer: string;
    setDealerIndex: (i: number) => void;
    unsetDealer: () => void;
}

export const useDealer = (): UseDealerReturnType => {
    const {
        game: { dealerIndex, players },
        setDealerIndex,
        unsetDealer,
    } = useGame();
    return { dealer: players[dealerIndex]?.name ?? '', setDealerIndex, unsetDealer };
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
