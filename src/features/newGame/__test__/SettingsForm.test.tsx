import React from 'react';

import { render, RenderResult, act, fireEvent } from '@testing-library/react';

import { NewGameContext } from '../context';
import { SettingsForm } from '../SettingsForm';
import { initialState, actions } from '../slice';
import { INewGameState, ScoringMode } from '../types';

const cleanupDOM = () => {
  document.getElementsByTagName('html')[0].innerHTML = '';
};

const renderWithSettings = (scoringMode: ScoringMode, bonusRounds: boolean) => {
  const state: INewGameState = { ...initialState, settings: { scoringMode, bonusRounds } };
  const mockDispatch = jest.fn();

  const res: [RenderResult, () => void, INewGameState] = [
    render(
      <NewGameContext.Provider value={{ state, dispatch: mockDispatch }}>
        <SettingsForm handleCreateGame={jest.fn()} />
      </NewGameContext.Provider>,
    ),
    mockDispatch,
    state,
  ];
  return res;
};

test('clicking the submit button should call handleCreateGame', () => {
  const mockHandleCreateGame = jest.fn();
  const { getByText } = render(<SettingsForm handleCreateGame={mockHandleCreateGame} />);
  act(() => {
    fireEvent.click(getByText(/create game/i));
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
    const [{ getAllByLabelText }] = renderWithSettings(t.scoringMode, false);
    t.standardRadioExpectation(getAllByLabelText(/standard scoring/i)[0]);
    t.negativeRadioExpectation(getAllByLabelText(/negative scoring/i)[0]);
    cleanupDOM();
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
    const [{ getByLabelText }, mockDispatch] = renderWithSettings(t.initialScoringMode, false);
    const radio = getByLabelText(t.targetInputLabelMatcher);
    act(() => {
      fireEvent.click(radio);
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenLastCalledWith(t.expAction);
    cleanupDOM();
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
    const [{ getByLabelText }] = renderWithSettings(ScoringMode.Negative, t.bonusRound);
    const bonusCheckbox = getByLabelText(/use bonus rounds/i);
    t.expectation(bonusCheckbox);
    cleanupDOM();
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
    const [{ getByLabelText }, mockDispatch] = renderWithSettings(ScoringMode.Negative, t.bonusRound);
    const bonusCheckbox = getByLabelText(/use bonus rounds/i);
    act(() => {
      fireEvent.click(bonusCheckbox);
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenLastCalledWith(actions.toggleBonusRounds());
    cleanupDOM();
  });
});
