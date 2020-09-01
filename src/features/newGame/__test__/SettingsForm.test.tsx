import React from 'react';

import { cleanup, render, act, fireEvent, screen } from '@testing-library/react';

import { NewGameContext } from '../context';
import { SettingsForm } from '../SettingsForm';
import { initialState, actions } from '../slice';
import { INewGameState, ScoringMode } from '../types';

const renderWithSettings = (scoringMode: ScoringMode, bonusRounds: boolean) => {
  const state: INewGameState = { ...initialState, settings: { scoringMode, bonusRounds } };
  const mockDispatch = jest.fn();

  render(
    <NewGameContext.Provider value={{ state, dispatch: mockDispatch }}>
      <SettingsForm handleCreateGame={jest.fn()} />
    </NewGameContext.Provider>,
  );
  const res: [() => void, INewGameState] = [mockDispatch, state];
  return res;
};

test('clicking the submit button should call handleCreateGame', () => {
  const mockHandleCreateGame = jest.fn();
  render(<SettingsForm handleCreateGame={mockHandleCreateGame} />);
  act(() => {
    fireEvent.click(screen.getByText(/create game/i));
  });
  expect(mockHandleCreateGame).toHaveBeenCalled();
});

test('scoring mode radio button check state is controlled by state', async () => {
  const tests = [
    {
      scoringMode: ScoringMode.Standard,
      standardRadioExpectation: (r: HTMLElement) => expect(r).toBeChecked(),
      negativeRadioExpectation: (r: HTMLElement) => expect(r).not.toBeChecked(),
    },
    {
      scoringMode: ScoringMode.Negative,
      standardRadioExpectation: (r: HTMLElement) => expect(r).not.toBeChecked(),
      negativeRadioExpectation: (r: HTMLElement) => expect(r).toBeChecked(),
    },
  ];

  tests.forEach(t => {
    renderWithSettings(t.scoringMode, false);
    t.standardRadioExpectation(screen.getAllByLabelText(/standard scoring/i)[0]);
    t.negativeRadioExpectation(screen.getAllByLabelText(/negative scoring/i)[0]);
    cleanup();
  });
});

test('scoring mode radio button clicks dispatch actions to update state', async () => {
  const tests = [
    {
      initialScoringMode: ScoringMode.Negative,
      targetInputLabelMatcher: /standard scoring/i,
      expAction: actions.setScoringMode(ScoringMode.Standard),
    },
    {
      initialScoringMode: ScoringMode.Standard,
      targetInputLabelMatcher: /negative scoring/i,
      expAction: actions.setScoringMode(ScoringMode.Negative),
    },
  ];
  tests.forEach(t => {
    const [mockDispatch] = renderWithSettings(t.initialScoringMode, false);
    const radio = screen.getByLabelText(t.targetInputLabelMatcher);
    act(() => {
      fireEvent.click(radio);
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenLastCalledWith(t.expAction);
    cleanup();
  });
});

test('bonus round checkbox state controlled by state', async () => {
  const tests = [
    {
      bonusRound: false,
      expectation: (cb: HTMLElement) => expect(cb).not.toBeChecked(),
    },
    {
      bonusRound: true,
      expectation: (cb: HTMLElement) => expect(cb).toBeChecked(),
    },
  ];
  tests.forEach(t => {
    renderWithSettings(ScoringMode.Negative, t.bonusRound);
    const bonusCheckbox = screen.getByLabelText(/use bonus rounds/i);
    t.expectation(bonusCheckbox);
    cleanup();
  });
});

test('bonus round checkbox click dispatches toggle action', async () => {
  const tests = [
    {
      bonusRound: false,
    },
    {
      bonusRound: true,
    },
  ];
  tests.forEach(t => {
    const [mockDispatch] = renderWithSettings(ScoringMode.Negative, t.bonusRound);
    const bonusCheckbox = screen.getByLabelText(/use bonus rounds/i);
    act(() => {
      fireEvent.click(bonusCheckbox);
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenLastCalledWith(actions.toggleBonusRounds());
    cleanup();
  });
});
