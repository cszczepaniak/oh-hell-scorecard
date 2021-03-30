import React from 'react';

import { useDispatch } from 'react-redux';

import { Game as GameModel, togglePhase } from './game';
import { useGame } from './game-hooks';
import { GameUI } from './GameUI';

export interface GameUIProps {
    game: GameModel;
    togglePhase: () => void;
}

export const Game: React.FunctionComponent = () => {
    const { game } = useGame();
    const dispatch = useDispatch();
    return <GameUI game={game} togglePhase={() => dispatch(togglePhase())} />;
};
