import React from 'react';

import { cleanup, render, act, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { defaultRequest, INewGameRequest, ScoringMode } from '../../../shared/newGame/types';
import { NewGameConfigContext } from '../context';
import { SettingsForm } from '../SettingsForm';
import { actions } from '../slice';

const renderWithSettings = (scoringMode: ScoringMode, bonusRounds: boolean) => {
  const state: INewGameRequest = { ...defaultRequest, settings: { scoringMode, bonusRounds } };
  const mockDispatch = jest.fn();

  render(
    <NewGameConfigContext.Provider value={{ state, dispatch: mockDispatch }}>
      <SettingsForm />
    </NewGameConfigContext.Provider>,
  );
  const res: [() => void, INewGameRequest] = [mockDispatch, state];
  return res;
};

test.each([
  [ScoringMode.Standard, true, false],
  [ScoringMode.Negative, false, true],
])(
  'scoring mode radio button check state is controlled by state',
  (scoringMode, expStandardCheckState, expNegativeCheckState) => {
    renderWithSettings(scoringMode, false);
    const standardRadio = screen.getAllByLabelText(/standard scoring/i)[0];
    const negativeRadio = screen.getAllByLabelText(/negative scoring/i)[0];
    [
      { exp: expStandardCheckState, component: standardRadio },
      { exp: expNegativeCheckState, component: negativeRadio },
    ].forEach(t => {
      if (t.exp) {
        expect(t.component).toBeChecked();
      } else {
        expect(t.component).not.toBeChecked();
      }
    });
    cleanup();
  },
);
test.each([
  [ScoringMode.Negative, /standard scoring/i, actions.setScoringMode(ScoringMode.Standard)],
  [ScoringMode.Standard, /negative scoring/i, actions.setScoringMode(ScoringMode.Negative)],
])(
  'scoring mode radio button clicks dispatch actions to update state',
  (initialScoringMode, targetInputLabelMatcher, expAction) => {
    const [mockDispatch] = renderWithSettings(initialScoringMode, false);
    const radio = screen.getByLabelText(targetInputLabelMatcher);
    act(() => {
      fireEvent.click(radio);
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenLastCalledWith(expAction);
    cleanup();
  },
);

test.each([
  [false, false],
  [true, true],
])('bonus round checkbox state controlled by state', (bonusRound, shouldBeChecked) => {
  renderWithSettings(ScoringMode.Negative, bonusRound);
  const bonusCheckbox = screen.getByLabelText(/use bonus rounds/i);
  if (shouldBeChecked) {
    expect(bonusCheckbox).toBeChecked();
  } else {
    expect(bonusCheckbox).not.toBeChecked();
  }
  cleanup();
});

test.each([false, true])('bonus round checkbox click dispatches toggle action', bonusRound => {
  const [mockDispatch] = renderWithSettings(ScoringMode.Negative, bonusRound);
  const bonusCheckbox = screen.getByLabelText(/use bonus rounds/i);
  act(() => {
    fireEvent.click(bonusCheckbox);
  });
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenLastCalledWith(actions.toggleBonusRounds());
  cleanup();
});

test('submitting reroutes to /game', () => {
  const testRequest: INewGameRequest = {
    playerNames: ['a', 'b', 'c', 'd'],
    dealer: 'a',
    settings: {
      bonusRounds: false,
      scoringMode: ScoringMode.Standard,
    },
  };
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <NewGameConfigContext.Provider value={{ state: testRequest, dispatch: jest.fn() }}>
        <SettingsForm />
      </NewGameConfigContext.Provider>
    </Router>,
  );
  act(() => {
    fireEvent.click(screen.getByText(/create game/i));
  });
  expect(history.location.pathname).toBe('/game');
});
