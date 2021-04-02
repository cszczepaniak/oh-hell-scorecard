import { areBidsValid, areTricksValid } from './validation';

export function calculateScores(
    bids: number[],
    tricks: number[],
    nCards: number,
    enableBonusRounds: boolean,
): number[] {
    const result: number[] = [];
    if (bids.length !== tricks.length) {
        throw new Error('Bids and tricks must have the same length!');
    }
    if (!areBidsValid(bids, nCards)) {
        throw new Error('Bids must not add up to the number of cards in this round!');
    }
    if (!areTricksValid(tricks, nCards)) {
        throw new Error('Tricks must add up to the number of cards in this round!');
    }
    const isBonusRound = isBonus(bids.length, nCards);
    for (let i = 0; i < bids.length; i++) {
        if (bids[i] === tricks[i]) {
            result.push(bids[i] + 10);
            if (enableBonusRounds && isBonusRound && bids[i] === 0) {
                result[i] += 10;
            }
            continue;
        }
        result.push(-Math.abs(bids[i] - tricks[i]));
    }
    return result;
}

export function isBonus(nPlayers: number, nCards: number): boolean {
    const leftoverCards = 52 - nPlayers * nCards;
    return leftoverCards <= nPlayers && leftoverCards > 0;
}
