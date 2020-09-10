import React from 'react';

import { act, cleanup, render, fireEvent, screen } from '@testing-library/react';

import { defaultRequest, INewGameRequest } from '../../../shared/persistence/types';
import { NewGameConfigContext, DisplayContext } from '../context';
import { SelectDealerForm } from '../SelectDealerForm';
import { actions } from '../slice';

const renderWithNames = (names: string[]) => {
  const mockState = { ...defaultRequest, playerNames: names };
  const mockDispatch = jest.fn();
  render(
    <DisplayContext.Provider value={{ displayIdx: 0, next: jest.fn(), previous: jest.fn() }}>
      <NewGameConfigContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <SelectDealerForm />
      </NewGameConfigContext.Provider>
    </DisplayContext.Provider>,
  );
  return { mockState, mockDispatch };
};

const renderWithState = (state: INewGameRequest) => {
  const mockDispatch = jest.fn();
  render(
    <NewGameConfigContext.Provider value={{ state, dispatch: mockDispatch }}>
      <SelectDealerForm />
    </NewGameConfigContext.Provider>,
  );
  return { mockDispatch };
};

const getNames = (n: number): string[] => {
  const letters = 'abcdefghij';
  if (n > letters.length) {
    throw new Error('too many names requested');
  }
  const names = Array(n).fill('');
  names.forEach((_, i) => {
    names[i] = letters.substring(i, i + 1);
  });
  return names;
};

const backButtonMatcher = /player names/i;
const submitButtonMatcher = /select settings/i;

test('buttons exist for each player in state', () => {
  const numAdditionalBtns = 2;
  const checkRenderResult = (state: INewGameRequest) => {
    expect(screen.getAllByRole('button')).toHaveLength(state.playerNames.length + numAdditionalBtns);
    state.playerNames.forEach(n => {
      const btn = screen.getByText(n);
      expect(btn).toBeInTheDocument();
    });
    cleanup();
  };
  let res = renderWithNames(getNames(4));
  checkRenderResult(res.mockState);
  res = renderWithNames(getNames(6));
  checkRenderResult(res.mockState);
});

test('clicking any button dispatches select dealer action, even if a dealer is already selected', () => {
  const names = getNames(4);
  const { mockDispatch } = renderWithNames(names);
  names.forEach(n => {
    act(() => {
      fireEvent.click(screen.getByText(n));
    });
    expect(mockDispatch).toHaveBeenLastCalledWith(actions.selectDealer(n));
  });
});

test('clicking the button for the selected dealer dispatches unselect dealer action', () => {
  const names = getNames(4);
  names.forEach(n => {
    const res = renderWithState({ ...defaultRequest, playerNames: names, dealer: n });
    const selectThisDealerBtn = screen.getByText(n);
    act(() => {
      fireEvent.click(selectThisDealerBtn);
    });
    expect(res.mockDispatch).toHaveBeenLastCalledWith(actions.unselectDealer());
    cleanup();
  });
});

test('clicking back button dispatches unselectDealer', () => {
  const names = getNames(4);
  const { mockDispatch } = renderWithNames(names);
  const backBtn = screen.getByText(backButtonMatcher);
  act(() => {
    fireEvent.click(backBtn);
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.unselectDealer());
});

test('submit button is disabled while no dealer is selected', () => {
  const names = getNames(4);
  renderWithNames(names);
  const submitBtn = screen.getByText(submitButtonMatcher);
  expect(submitBtn).toBeDisabled();
});

test('submit button is disabled while dealer name is not in player names', () => {
  const names = getNames(4);
  renderWithState({ ...defaultRequest, playerNames: names, dealer: 'notAValidName' });
  const submitBtn = screen.getByText(submitButtonMatcher);
  expect(submitBtn).toBeDisabled();
});

test('submit button is enabled while dealer name is valid', () => {
  const names = getNames(4);
  names.forEach(n => {
    const {} = renderWithState({ ...defaultRequest, playerNames: names, dealer: n });
    const submitBtn = screen.getByText(submitButtonMatcher);
    expect(submitBtn).not.toBeDisabled();
    cleanup();
  });
});
