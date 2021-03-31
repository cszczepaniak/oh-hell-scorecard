import { scoreRound } from './scoring';

describe('scoreRound', () => {
    test.each([
        [[0, 0, 0], [1, 0, 0], 1, [-1, 10, 10]],
        [[1, 2, 3], [1, 0, 0], 1, [11, -2, -3]],
        [[1, 2, 3], [0, 5, 0], 5, [-1, -3, -3]],
        [[1, 2, 3, 0], [5, 5, 3, 0], 13, [-4, -3, 13, 10]], // round of 13 cards with 4 players is not a bonus round
        [[1, 1, 1, 1, 1], [0, 5, 0, 5, 0], 10, [-1, -4, -1, -4, -1]],
        [[1, 3, 4, 1, 0], [1, 3, 4, 2, 0], 10, [11, 13, 14, -1, 10]],
    ])('scoring a normal round works', (bids, tricks, nCards, expScores) => {
        const scores = scoreRound(bids, tricks, nCards, false);
        expect(scores).toEqual(expScores);
    });

    test.each([
        [[10, 6, 0], [10, 7, 0], 17, [20, -1, 20]],
        [[4, 2, 4, 0], [3, 4, 5, 0], 12, [-1, -2, -1, 20]],
        [[1, 2, 3, 0, 0], [4, 4, 2, 0, 0], 10, [-3, -2, -1, 20, 20]],
        [[4, 3, 2, 1, 0, 0], [2, 2, 2, 1, 1, 0], 8, [-2, -1, 12, 11, -1, 20]],
    ])('scoring a bonus round works', (bids, tricks, nCards, expScores) => {
        const scores = scoreRound(bids, tricks, nCards, true);
        expect(scores).toEqual(expScores);
    });

    test.each([
        [[10, 6, 0], [10, 7, 0, 0], 17, 'Bids and tricks must have the same length!'],
        [[1, 1, 1], [0, 0, 0], 3, 'Bids must not add up to the number of cards in this round!'],
        [[1, 1, 0], [0, 0, 0], 3, 'Tricks must add up to the number of cards in this round!'],
    ])('throws when there is an error', (bids, tricks, nCards, expError) => {
        expect.assertions(1);
        try {
            scoreRound(bids, tricks, nCards, false);
        } catch (err) {
            expect(err.message).toEqual(expError);
        }
    });
});
