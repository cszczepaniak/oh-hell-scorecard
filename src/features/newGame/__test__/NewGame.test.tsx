import React from 'react';

import { act, render, wait, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewGame } from '../NewGame';

test('should be able to click through the screens', async () => {
  const { getAllByPlaceholderText, getAllByRole, getByText } = render(
    <NewGame minPlayers={3} maxPlayers={10} handleCreateGame={jest.fn()} />,
  );
  expect(getByText(/enter player names/i)).toBeInTheDocument();
  const playerNameInputs = getAllByPlaceholderText(/player \d+/i);
  const selectDealerButton = getByText(/select dealer/i);
  for (let i = 0; i < playerNameInputs.length; i++) {
    await wait(async () => {
      await userEvent.type(playerNameInputs[i], 'a');
    });
  }
  await wait(() => {
    fireEvent.click(selectDealerButton);
  });
  expect(getByText(/choose dealer/i)).toBeInTheDocument();
  const chosenDealerButton = getAllByRole('button')[0];
  const selectSettingsButton = getByText(/select settings/i);
  act(() => {
    fireEvent.click(chosenDealerButton);
  });
  act(() => {
    fireEvent.click(selectSettingsButton);
  });
  expect(getByText(/choose settings/i)).toBeInTheDocument();
});
