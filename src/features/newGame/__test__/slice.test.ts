import { initialState, reducer, actions } from '../slice';
import { INewGameState, ScoringMode } from '../types';

test('reducer should set player names with setPlayerNames action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const state = { ...initialState };
  expect(state.playerNames).toStrictEqual([]);
  const newState = reducer(state, actions.setPlayerNames(playerNames));
  expect(newState.playerNames).toBe(playerNames);
});

test('reducer should set dealer with setDealer action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealerName = 'a';
  const state = { ...initialState, playerNames };
  expect(state.dealer).toBe('');
  const newState = reducer(state, actions.selectDealer(dealerName));
  expect(newState.dealer).toBe(dealerName);
});

test('reducer should not set dealer with setDealer action if requested dealer is not a player', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealerName = 'e';
  const state = { ...initialState, playerNames };
  expect(state.dealer).toBe('');
  const newState = reducer(state, actions.selectDealer(dealerName));
  expect(newState.dealer).toBe('');
});

test('reducer should clear dealer with unselectDealer action', () => {
  const playerNames = ['a', 'b', 'c', 'd'];
  const dealer = 'a';
  const state = { ...initialState, playerNames, dealer };
  expect(state.dealer).toBe(dealer);
  const newState = reducer(state, actions.unselectDealer());
  expect(newState.dealer).toBe('');
});

test('reducer should toggle bonus rounds setting with toggleBonusRounds action', () => {
  const getStateWithBonusRoundsSetTo = (br: boolean) => {
    const state: INewGameState = { ...initialState, settings: { ...initialState.settings, bonusRounds: br } };
    return state;
  };
  const tests = [
    {
      bonusRounds: false,
      expToggledValue: true,
    },
    {
      bonusRounds: true,
      expToggledValue: false,
    },
  ];
  tests.forEach((t) => {
    const state = getStateWithBonusRoundsSetTo(t.bonusRounds);
    expect(state.settings.bonusRounds).toBe(t.bonusRounds);
    const newState = reducer(state, actions.toggleBonusRounds());
    expect(newState.settings.bonusRounds).toBe(t.expToggledValue);
  });
});

test('reducer shouold set scoring mode with setScoringMode action', () => {
  const state: INewGameState = {
    ...initialState,
    settings: { ...initialState.settings, scoringMode: ScoringMode.Negative },
  };
  expect(state.settings.scoringMode).toBe(ScoringMode.Negative);
  const newState = reducer(state, actions.setScoringMode(ScoringMode.Standard));
  expect(newState.settings.scoringMode).toBe(ScoringMode.Standard);
});
