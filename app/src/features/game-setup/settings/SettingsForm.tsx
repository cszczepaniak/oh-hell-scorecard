import React, { useState } from 'react';

import { useHistory } from 'react-router';

import { ScoringMode } from '../../game/game';
import { useGame } from '../../game/game-hooks';
import { useGameSettings } from '../hooks';
import { SettingsFormUI } from './SettingsFormUI';

export interface SettingsFormUIProps {
    bonusRoundModalOpen: boolean;
    setBonusRoundModalOpen: (val: boolean) => void;
    scoringModeModalOpen: boolean;
    setScoringModeModalOpen: (val: boolean) => void;
    bonusRounds: boolean;
    setBonusRounds: (val: boolean) => void;
    scoringMode: ScoringMode;
    handleScoringModeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    handleSubmit: () => void;
    backTo: string;
}

export const SettingsForm: React.FunctionComponent = () => {
    const { bonusRounds, setBonusRounds, scoringMode, setScoringMode } = useGameSettings();
    const { initializePlayers } = useGame();
    const history = useHistory();
    const [bonusRoundModalOpen, setBonusRoundModalOpen] = useState(false);
    const [scoringModeModalOpen, setScoringModeModalOpen] = useState(false);

    const handleScoringModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setScoringMode(event.target.value as ScoringMode);
    };

    const handleSubmit = () => {
        initializePlayers();
        history.push('/game');
    };

    const props: SettingsFormUIProps = {
        bonusRoundModalOpen,
        setBonusRoundModalOpen,
        scoringModeModalOpen,
        setScoringModeModalOpen,
        bonusRounds,
        setBonusRounds,
        scoringMode,
        handleScoringModeChange,
        handleSubmit,
        backTo: '/selectDealer',
    };

    return <SettingsFormUI {...props} />;
};
