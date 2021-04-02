export function getNumberOfRounds(nPlayers: number): number {
    const maxCards = getMaxCards(nPlayers);
    if (52 % nPlayers === 0) {
        return maxCards * 2 - 1;
    }
    return maxCards * 2;
}

export function getNumberOfCards(nPlayers: number, round: number): number {
    const maxCards = getMaxCards(nPlayers);
    if (round <= maxCards) {
        return round;
    }
    if (52 % nPlayers === 0) {
        return maxCards * 2 - round;
    }
    return maxCards * 2 + 1 - round;
}

export function getMaxCards(nPlayers: number): number {
    return Math.floor(52 / nPlayers);
}
