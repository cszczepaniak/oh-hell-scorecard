export function areBidsValid(bids: number[], nCards: number): boolean {
    return bids.reduce((prev, n) => prev + n, 0) !== nCards;
}

export function areTricksValid(tricks: number[], nCards: number): boolean {
    return tricks.reduce((prev, n) => prev + n, 0) === nCards;
}
