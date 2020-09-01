import React from 'react';

import { act, render, wait, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewGame } from '../NewGame';

test('should be able to click through the screens and back', async () => {
  render(<NewGame minPlayers={3} maxPlayers={10} handleCreateGame={jest.fn()} />);
  expect(screen.getByText(/enter player names/i)).toBeInTheDocument();
  const playerNameInputs = screen.getAllByPlaceholderText(/player \d+/i);
  const names = ['a', 'b', 'c', 'd'];
  const selectDealerButton = screen.getByText(/select dealer/i);
  for (let i = 0; i < playerNameInputs.length; i++) {
    await wait(async () => {
      await userEvent.type(playerNameInputs[i], names[i]);
    });
  }
  await wait(() => {
    fireEvent.click(selectDealerButton);
  });
  expect(screen.getByText(/choose dealer/i)).toBeInTheDocument();
  const dealer = names[0];
  const chosenDealerButton = screen.getByText(dealer);
  const selectSettingsButton = screen.getByText(/select settings/i);
  act(() => {
    fireEvent.click(chosenDealerButton);
  });
  act(() => {
    fireEvent.click(selectSettingsButton);
  });
  expect(screen.getByText(/choose settings/i)).toBeInTheDocument();

  // now go backwards
  act(() => {
    fireEvent.click(screen.getByText(/select dealer/i));
  });
  expect(screen.getByText(/choose dealer/i)).toBeInTheDocument();
  act(() => {
    fireEvent.click(screen.getByText(/player names/i));
  });
  expect(screen.getByText(/enter player names/i)).toBeInTheDocument();
});
