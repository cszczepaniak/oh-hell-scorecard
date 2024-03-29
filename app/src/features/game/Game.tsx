import React, { useEffect, useState } from 'react';

import { areBidsValid, areTricksValid } from '../../lib/game/validation';
import { allowInteger } from '../../lib/utils/input-utils';
import { useDealer } from '../game-setup/hooks';
import { useGame } from './game-hooks';
import { GameModel } from './game-state';
import { GameUI } from './GameUI';

export interface GameUIProps {
    game: GameModel;
    dealer: string;
    phase: Phase;
    error: string;
    handleBidChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    handleTrickChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
    handleSubmitBids: () => void;
    handleSubmitTricks: () => void;
}

export type Phase = 'Bidding' | 'Scoring';

export const Game: React.FunctionComponent = () => {
    const { game, resetBids, resetTricks, submitRound, incrementRound, setBid, setTrick } = useGame();
    const { dealer } = useDealer();
    const [phase, setPhase] = useState<Phase>('Bidding');
    const [error, setError] = useState('');
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }, [error, setError]);
    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const bidStr = allowInteger(game.players[i].currentBid.toString(), e.target.value);
        const bidVal = Number(bidStr);
        if (bidVal >= 0 && bidVal <= game.numberOfCards) {
            setBid(bidVal, i);
        }
    };
    const handleTrickChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const trickStr = allowInteger(game.players[i].currentTricks.toString(), e.target.value);
        const trickVal = Number(trickStr);
        if (trickVal >= 0 && trickVal <= game.numberOfCards) {
            setTrick(trickVal, i);
        }
    };
    const handleSubmitBids = () => {
        if (phase !== 'Bidding') {
            return;
        }
        if (
            !areBidsValid(
                game.players.map(p => p.currentBid),
                game.numberOfCards,
            )
        ) {
            setError('Number of bids must not add up to the number of cards!');
            return;
        }
        setPhase('Scoring');
    };
    const handleSubmitTricks = () => {
        if (phase !== 'Scoring') {
            return;
        }
        if (
            !areTricksValid(
                game.players.map(p => p.currentTricks),
                game.numberOfCards,
            )
        ) {
            setError('Number of tricks must add up to the number of cards!');
            return;
        }
        submitRound();
        incrementRound();
        setPhase('Bidding');
        resetBids();
        resetTricks();
    };
    return (
        <GameUI
            game={game}
            dealer={dealer}
            phase={phase}
            error={error}
            handleSubmitBids={handleSubmitBids}
            handleSubmitTricks={handleSubmitTricks}
            handleBidChange={handleBidChange}
            handleTrickChange={handleTrickChange}
        />
    );
};
