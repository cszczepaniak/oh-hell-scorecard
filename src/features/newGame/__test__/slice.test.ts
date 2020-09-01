import { defaultRequest } from '../../shared/newGame/types';
import { reducer, actions } from '../slice';
import { INewGameState, ScoringMode } from '../types';

test('reducer should set player names with setPlayerNames action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const state = { ...defaultRequest };
  expect(state.playerNames).toStrictEqual([]);
  const newState = reducer(state, actions.setPlayerNames(playerNames));
  expect(newState.playerNames).toBe(playerNames);
});

test('reducer should set dealer with setDealer action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealerName = 'a';
  const state = { ...defaultRequest, playerNames };
  expect(state.dealer).toBe('');
  const newState = reducer(state, actions.selectDealer(dealerName));
  expect(newState.dealer).toBe(dealerName);
});

test('reducer should not set dealer with setDealer action if requested dealer is not a player', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealerName = 'e';
  const state = { ...defaultRequest, playerNames };
  expect(state.dealer).toBe('');
  const newState = reducer(state, actions.selectDealer(dealerName));
  expect(newState.dealer).toBe('');
});

test('reducer should clear dealer with unselectDealer action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealer = 'a';
  const state = { ...defaultRequest, playerNames, dealer };
  expect(state.dealer).toBe(dealer);
  const newState = reducer(state, actions.unselectDealer());
  expect(newState.dealer).toBe('');
});

test.each([
  [false, true],
  [true, false],
])('reducer should toggle bonus rounds setting with toggleBonusRounds action', (bonusRounds, expToggledValue) => {
  const getStateWithBonusRoundsSetTo = (br: boolean) => {
    const state: INewGameState = { ...defaultRequest, settings: { ...defaultRequest.settings, bonusRounds: br } };
    return state;
  };

  const state = getStateWithBonusRoundsSetTo(bonusRounds);
  expect(state.settings.bonusRounds).toBe(bonusRounds);
  const newState = reducer(state, actions.toggleBonusRounds());
  expect(newState.settings.bonusRounds).toBe(expToggledValue);
});

test('reducer shouold set scoring mode with setScoringMode action', () => {
  const state: INewGameState = {
    ...defaultRequest,
    settings: { ...defaultRequest.settings, scoringMode: ScoringMode.Negative },
  };
  expect(state.settings.scoringMode).toBe(ScoringMode.Negative);
  const newState = reducer(state, actions.setScoringMode(ScoringMode.Standard));
  expect(newState.settings.scoringMode).toBe(ScoringMode.Standard);
});
