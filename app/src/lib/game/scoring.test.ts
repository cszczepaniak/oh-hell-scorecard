import { GameModel, Player, ScoringMode } from '../../features/game/game-state';
import { calculateScores } from './scoring';

const createGameFactory =
    (scoringMode: ScoringMode, bonusRounds = true) =>
    (bids: number[], tricks: number[], nCards: number): GameModel => {
        const testPlayers: Player[] = bids.map((b, i) => ({
            currentBid: b,
            currentTricks: tricks[i],
            name: '',
            score: 0,
        }));
        return {
            settings: {
                scoringMode,
                bonusRounds,
            },
            round: 0,
            players: testPlayers,
            numberOfCards: nCards,
            dealerIndex: 0,
        };
    };

describe('scoreRound', () => {
    test.each([
        [[0, 0, 0], [1, 0, 0], 1, [-1, 10, 10]],
        [[1, 2, 3], [1, 0, 0], 1, [11, -2, -3]],
        [[1, 2, 3], [0, 5, 0], 5, [-1, -3, -3]],
        [[1, 2, 3, 0], [5, 5, 3, 0], 13, [-4, -3, 13, 10]], // round of 13 cards with 4 players is not a bonus round
        // bonus rounds
        [[10, 6, 0], [10, 7, 0], 17, [20, -1, 20]],
        [[4, 2, 4, 0], [3, 4, 5, 0], 12, [-1, -2, -1, 20]],
        [[1, 2, 3, 0, 0], [4, 4, 2, 0, 0], 10, [-3, -2, -1, 20, 20]],
        [[4, 3, 2, 1, 0, 0], [2, 2, 2, 1, 1, 0], 8, [-2, -1, 12, 11, -1, 20]],
        [[1, 3, 4, 1, 0], [1, 3, 4, 2, 0], 10, [11, 13, 14, -1, 20]],
    ])('negative scoring mode works', (bids, tricks, nCards, expScores) => {
        const testGame = createGameFactory('Negative')(bids, tricks, nCards);

        const scores = calculateScores(testGame);

        expect(scores).toEqual(expScores);
    });

    test.each([
        [[0, 0, 0], [1, 0, 0], 1, [1, 10, 10]],
        [[1, 2, 3], [1, 0, 0], 1, [11, 0, 0]],
        [[1, 2, 3], [0, 5, 0], 5, [0, 5, 0]],
        [[1, 2, 3, 0], [5, 5, 3, 0], 13, [5, 5, 13, 10]], // round of 13 cards with 4 players is not a bonus round
        // bonus rounds
        [[10, 6, 0], [10, 7, 0], 17, [20, 7, 20]],
        [[4, 2, 4, 0], [3, 4, 5, 0], 12, [3, 4, 5, 20]],
        [[1, 2, 3, 0, 0], [4, 4, 2, 0, 0], 10, [4, 4, 2, 20, 20]],
        [[4, 3, 2, 1, 0, 0], [2, 2, 2, 1, 1, 0], 8, [2, 2, 12, 11, 1, 20]],
        [[1, 3, 4, 1, 0], [1, 3, 4, 2, 0], 10, [11, 13, 14, 2, 20]],
    ])('standard scoring mode works', (bids, tricks, nCards, expScores) => {
        const testGame = createGameFactory('Standard')(bids, tricks, nCards);

        const scores = calculateScores(testGame);

        expect(scores).toEqual(expScores);
    });

    test.each([
        [[10, 6, 0], [10, 7, 0], 17, [20, 7, 10]],
        [[4, 2, 4, 0], [3, 4, 5, 0], 12, [3, 4, 5, 10]],
        [[1, 2, 3, 0, 0], [4, 4, 2, 0, 0], 10, [4, 4, 2, 10, 10]],
        [[4, 3, 2, 1, 0, 0], [2, 2, 2, 1, 1, 0], 8, [2, 2, 12, 11, 1, 10]],
        [[1, 3, 4, 1, 0], [1, 3, 4, 2, 0], 10, [11, 13, 14, 2, 10]],
    ])('disabling bonus rounds works', (bids, tricks, nCards, expScores) => {
        const testGame = createGameFactory('Standard', false)(bids, tricks, nCards);

        const scores = calculateScores(testGame);

        expect(scores).toEqual(expScores);
    });

    test.each([
        [[1, 1, 1], [0, 0, 0], 3, 'Bids must not add up to the number of cards in this round!'],
        [[1, 1, 0], [0, 0, 0], 3, 'Tricks must add up to the number of cards in this round!'],
    ])('throws when there is an error', (bids, tricks, nCards, expError) => {
        const testGame = createGameFactory('Negative', true)(bids, tricks, nCards);
        expect.assertions(1);
        try {
            calculateScores(testGame);
        } catch (err) {
            expect(err.message).toEqual(expError);
        }
    });
});
