import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';

import { NewGameContext } from '../context';
import { SettingsForm } from '../SettingsForm';
import { initialState } from '../slice';
import { INewGameState, ScoringMode } from '../types';

// const cleanupDOM = () => {
//   document.getElementsByTagName('html')[0].innerHTML = '';
// };

const renderWithSettings = (scoringMode: ScoringMode, bonusRounds: boolean) => {
  const state: INewGameState = { ...initialState, settings: { scoringMode, bonusRounds } };
  return render(
    <NewGameContext.Provider value={{ state, dispatch: jest.fn() }}>
      <SettingsForm />
    </NewGameContext.Provider>,
  );
};

test('scoring mode radio buttons can be checked', async () => {
  const { getAllByLabelText } = renderWithSettings(ScoringMode.Negative, false);
  const standardRadio = getAllByLabelText(/standard scoring/i)[0];
  const negativeRadio = getAllByLabelText(/negative scoring/i)[0];
  expect(standardRadio).not.toBeChecked();
  await wait(() => {
    fireEvent.click(standardRadio);
  });
  expect(standardRadio).toBeChecked();
  expect(negativeRadio).not.toBeChecked();
  await wait(() => {
    fireEvent.click(negativeRadio);
  });
  expect(negativeRadio).toBeChecked();
});

test('bonus round checkbox can be toggled', async () => {
  const { getByLabelText } = renderWithSettings(ScoringMode.Negative, false);
  const bonusCheckbox = getByLabelText(/use bonus rounds/i);
  expect(bonusCheckbox).not.toBeChecked();
});
