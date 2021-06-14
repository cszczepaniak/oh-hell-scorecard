import { GameModel, ScoringMode } from '../../features/game/game-state';
import { areBidsValid, areTricksValid } from './validation';

export function calculateScores(game: GameModel): number[] {
    const result: number[] = [];
    const bids = game.players.map(p => p.currentBid);
    const tricks = game.players.map(p => p.currentTricks);
    if (!areBidsValid(bids, game.numberOfCards)) {
        throw new Error('Bids must not add up to the number of cards in this round!');
    }
    if (!areTricksValid(tricks, game.numberOfCards)) {
        throw new Error('Tricks must add up to the number of cards in this round!');
    }
    const isBonusRound = isBonus(bids.length, game.numberOfCards);
    for (let i = 0; i < bids.length; i++) {
        // everyone always gets 10 + bids for hitting
        if (bids[i] === tricks[i]) {
            result.push(bids[i] + 10);
            if (game.settings.bonusRounds && isBonusRound && bids[i] === 0) {
                result[i] += 10;
            }
            continue;
        }
        result.push(scoreFailedBid(bids[i], tricks[i], game.settings.scoringMode));
    }
    return result;
}

export function isBonus(nPlayers: number, nCards: number): boolean {
    const leftoverCards = 52 - nPlayers * nCards;
    return leftoverCards <= nPlayers && leftoverCards > 0;
}

function scoreFailedBid(bid: number, tricks: number, scoringMode: ScoringMode) {
    if (scoringMode === 'Negative') {
        return -Math.abs(bid - tricks);
    }
    return tricks;
}
