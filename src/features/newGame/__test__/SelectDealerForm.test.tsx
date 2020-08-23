import React from 'react';

import { act, render, fireEvent, RenderResult } from '@testing-library/react';

import { NewGameContext } from '../context';
import { SelectDealerForm } from '../SelectDealerForm';
import { actions, initialState, NewGameState } from '../slice';

const cleanupDOM = () => {
  document.getElementsByTagName('html')[0].innerHTML = '';
};

const renderWithNames = (names: string[], dealer = '') => {
  const state = { ...initialState, dealer, playerNames: names };
  const dispatch = jest.fn();
  const renderResult = render(
    <NewGameContext.Provider value={{ state, dispatch }}>
      <SelectDealerForm />
    </NewGameContext.Provider>,
  );
  return { state, dispatch, renderResult };
};

const renderWithState = (state: NewGameState) => {
  const dispatch = jest.fn();
  const renderResult = render(
    <NewGameContext.Provider value={{ state, dispatch }}>
      <SelectDealerForm />
    </NewGameContext.Provider>,
  );
  return { dispatch, renderResult };
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

const backBtnIdx = (nPlayers: number) => {
  return nPlayers;
};
const submitBtnIdx = (nPlayers: number) => {
  return nPlayers + 1;
};

test('buttons exist for each player in state', () => {
  const numAdditionalBtns = 2;
  const checkRenderResult = (state: NewGameState, renderResult: RenderResult) => {
    const { getAllByRole, getByText } = renderResult;
    expect(getAllByRole('button')).toHaveLength(state.playerNames.length + numAdditionalBtns);
    state.playerNames.forEach((n: string, i: number) => {
      expect(getAllByRole('button')[i]).toEqual(getByText(n));
    });
    cleanupDOM();
  };
  let res = renderWithNames(getNames(4));
  checkRenderResult(res.state, res.renderResult);
  res = renderWithNames(getNames(6));
  checkRenderResult(res.state, res.renderResult);
});

test('clicking any button dispatches select dealer action, even if a dealer is already selected', () => {
  const names = getNames(4);
  const res = renderWithNames(names);
  const { getAllByRole } = res.renderResult;
  const selectDealerBtns = getAllByRole('button').slice(0, 3);
  selectDealerBtns.forEach((b, i) => {
    act(() => {
      fireEvent.click(b);
    });
    expect(res.dispatch).toHaveBeenLastCalledWith(actions.selectDealer(names[i]));
  });
});

test('clicking the button for the selected dealer dispatches unselect dealer action', () => {
  const names = getNames(4);
  names.forEach((n, i) => {
    const res = renderWithState({ ...initialState, playerNames: names, dealer: n });
    const { getAllByRole } = res.renderResult;
    const selectThisDealerBtn = getAllByRole('button')[i];
    act(() => {
      fireEvent.click(selectThisDealerBtn);
    });
    expect(res.dispatch).toHaveBeenLastCalledWith(actions.unselectDealer());
    cleanupDOM();
  });
});

test('clicking back button dispatches unselectDealer and decrementIdx', () => {
  const names = getNames(4);
  const {
    renderResult: { getAllByRole },
    dispatch,
  } = renderWithNames(names);
  const backBtn = getAllByRole('button')[backBtnIdx(names.length)];
  act(() => {
    fireEvent.click(backBtn);
  });
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenNthCalledWith(1, actions.unselectDealer());
  expect(dispatch).toHaveBeenNthCalledWith(2, actions.decrementIdx());
});

test('submit button is disabled while no dealer is selected', () => {
  const names = getNames(4);
  const {
    renderResult: { getAllByRole },
  } = renderWithNames(names);
  const submitBtn = getAllByRole('button')[submitBtnIdx(names.length)];
  expect(submitBtn).toBeDisabled();
});

test('submit button is disabled while dealer name is not in player names', () => {
  const names = getNames(4);
  const {
    renderResult: { getAllByRole },
  } = renderWithState({ ...initialState, playerNames: names, dealer: 'notAValidName' });
  const submitBtn = getAllByRole('button')[submitBtnIdx(names.length)];
  expect(submitBtn).toBeDisabled();
});

test('incrementIdx is not dispatched when dealer name is invalid', () => {
  const names = getNames(4);
  const {
    renderResult: { getAllByRole },
    dispatch,
  } = renderWithState({ ...initialState, playerNames: names, dealer: 'notAValidName' });
  const submitBtn = getAllByRole('button')[submitBtnIdx(names.length)];
  act(() => {
    fireEvent.click(submitBtn);
  });
  expect(dispatch).not.toHaveBeenCalled();
});

test('submit button is enabled while dealer name is valid', () => {
  const names = getNames(4);
  names.forEach((n) => {
    const {
      renderResult: { getAllByRole },
    } = renderWithState({ ...initialState, playerNames: names, dealer: n });
    const submitBtn = getAllByRole('button')[submitBtnIdx(names.length)];
    expect(submitBtn).not.toBeDisabled();
    cleanupDOM();
  });
});

test('incrementIdx is dispatched when submitted', () => {
  const names = getNames(4);
  const {
    renderResult: { getAllByRole },
    dispatch,
  } = renderWithState({ ...initialState, playerNames: names, dealer: names[0] });
  const submitBtn = getAllByRole('button')[submitBtnIdx(names.length)];
  act(() => {
    fireEvent.click(submitBtn);
  });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenLastCalledWith(actions.incrementIdx());
});
