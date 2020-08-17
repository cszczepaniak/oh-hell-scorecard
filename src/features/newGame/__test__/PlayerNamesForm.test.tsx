import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlayerNamesForm } from '../PlayerNamesForm';

const plusBtnIdx = 0;
const minusBtnIdx = 1;
const resetBtnIdx = 2;
const submitBtnIdx = 3;
const inputPlaceholderRegex = /Player \d+/i;

test('inputs are added one at a time until max is reached', async () => {
  const maxPlayers = 10;

  const { getAllByPlaceholderText, getAllByRole } = render(<PlayerNamesForm minPlayers={3} maxPlayers={maxPlayers} />);

  const plus = getAllByRole('button')[plusBtnIdx];
  const startingPlayers = 4;
  const getInputs = () => getAllByPlaceholderText(inputPlaceholderRegex);
  const clickPlus = async () => {
    await wait(() => fireEvent.click(plus));
  };

  for (let i = startingPlayers; i <= maxPlayers; i++) {
    const inputs = getInputs();
    expect(inputs).toHaveLength(i);
    await clickPlus();
  }
  expect(plus).toBeDisabled();
  // fire the event once more to make sure we don't exceed `maxPlayers` inputs
  await clickPlus();
  const inputs = getInputs();
  expect(inputs).toHaveLength(maxPlayers);
});

test('inputs are removed one at a time until min is reached', async () => {
  const minPlayers = 3;

  const { getAllByPlaceholderText, getAllByRole } = render(<PlayerNamesForm minPlayers={minPlayers} maxPlayers={10} />);

  const minus = getAllByRole('button')[minusBtnIdx];
  const startingPlayers = 4;
  const getInputs = () => getAllByPlaceholderText(inputPlaceholderRegex);
  const clickMinus = async () => {
    await wait(() => fireEvent.click(minus));
  };

  for (let i = startingPlayers; i >= minPlayers; i--) {
    const inputs = getInputs();
    expect(inputs).toHaveLength(i);
    await clickMinus();
  }
  expect(minus).toBeDisabled();
  // fire the event once more to make sure we don't exceed `maxPlayers` inputs
  await clickMinus();
  const inputs = getInputs();
  expect(inputs).toHaveLength(minPlayers);
});

test('validation text appears when leaving an invalid field', async () => {
  const { getAllByPlaceholderText, queryAllByText, queryByText } = render(
    <PlayerNamesForm minPlayers={3} maxPlayers={10} />,
  );
  const getValidationMessages = () => queryAllByText(/name is required/i);
  const inputs = getAllByPlaceholderText(inputPlaceholderRegex);
  expect(queryByText(/name is required/i)).not.toBeInTheDocument();
  for (let i = 0; i < 1; i++) {
    await wait(() => {
      fireEvent.focus(inputs[i]);
    });
    expect(getValidationMessages()).toHaveLength(i);
    await wait(() => {
      fireEvent.blur(inputs[i]);
    });
    expect(getValidationMessages()).toHaveLength(i + 1);
  }
});

test('select dealer button is disabled until form is valid', async () => {
  const { getAllByPlaceholderText, getAllByRole } = render(<PlayerNamesForm minPlayers={3} maxPlayers={10} />);
  const submitBtn = getAllByRole('button')[submitBtnIdx];
  const inputs = getAllByPlaceholderText(inputPlaceholderRegex);
  // type in three inputs first
  for (let i = 0; i < inputs.length - 1; i++) {
    await wait(async () => {
      await userEvent.type(inputs[i], `player${i}`);
    });
    expect(submitBtn).toBeDisabled();
  }
  await wait(async () => {
    await userEvent.type(inputs[inputs.length - 1], `player${inputs.length - 1}`);
  });
  // then the last
  expect(submitBtn).not.toBeDisabled();
});

test('clear form button resets the form', async () => {
  const { getAllByRole, getAllByPlaceholderText, queryAllByDisplayValue } = render(
    <PlayerNamesForm minPlayers={3} maxPlayers={10} />,
  );
  const resetBtn = getAllByRole('button')[resetBtnIdx];
  const inputs = getAllByPlaceholderText(inputPlaceholderRegex);
  for (let i = 1; i < inputs.length; i++) {
    // fill in some inputs
    for (let j = 0; j < i; j++) {
      await wait(async () => {
        await userEvent.type(inputs[j], `player${j}`);
      });
    }
    expect(queryAllByDisplayValue(/player\d+/i)).toHaveLength(i);
    await wait(() => {
      fireEvent.click(resetBtn);
    });
    expect(queryAllByDisplayValue(/player\d+/i)).toHaveLength(0);
  }
});
