import React from 'react';

import { act, render, wait, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewGame } from '../NewGame';

test('should be able to click through the screens and back', async () => {
  const { getAllByPlaceholderText, getByText } = render(
    <NewGame minPlayers={3} maxPlayers={10} handleCreateGame={jest.fn()} />,
  );
  expect(getByText(/enter player names/i)).toBeInTheDocument();
  const playerNameInputs = getAllByPlaceholderText(/player \d+/i);
  const names = ['a', 'b', 'c', 'd'];
  const selectDealerButton = getByText(/select dealer/i);
  for (let i = 0; i < playerNameInputs.length; i++) {
    await wait(async () => {
      await userEvent.type(playerNameInputs[i], names[i]);
    });
  }
  await wait(() => {
    fireEvent.click(selectDealerButton);
  });
  expect(getByText(/choose dealer/i)).toBeInTheDocument();
  const dealer = names[0];
  const chosenDealerButton = getByText(dealer);
  const selectSettingsButton = getByText(/select settings/i);
  act(() => {
    fireEvent.click(chosenDealerButton);
  });
  act(() => {
    fireEvent.click(selectSettingsButton);
  });
  expect(getByText(/choose settings/i)).toBeInTheDocument();

  // now go backwards
  act(() => {
    fireEvent.click(getByText(/select dealer/i));
  });
  expect(getByText(/choose dealer/i)).toBeInTheDocument();
  act(() => {
    fireEvent.click(getByText(/player names/i));
  });
  expect(getByText(/enter player names/i)).toBeInTheDocument();
});
