import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';

import { NewGameContext } from '../context';
import { SelectDealerForm } from '../SelectDealerForm';
import { actions, initialState } from '../slice';

const cleanupDOM = () => {
  document.getElementsByTagName('html')[0].innerHTML = '';
};
const renderWithNames = (names: string[]) => {
  const state = { ...initialState, playerNames: names };
  const dispatch = jest.fn();
  const renderResult = render(
    <NewGameContext.Provider value={{ state, dispatch }}>
      <SelectDealerForm />
    </NewGameContext.Provider>,
  );
  return { state, dispatch, renderResult };
};

test('buttons exist for each player in state', () => {
  const numAdditionalBtns = 2;
  const checkRenderResult = (state, renderResult) => {
    const { getAllByRole, getByText } = renderResult;
    expect(getAllByRole('button')).toHaveLength(state.playerNames.length + numAdditionalBtns);
    state.playerNames.forEach((n: string, i: number) => {
      expect(getAllByRole('button')[i]).toEqual(getByText(n));
    });
    cleanupDOM();
  };
  let res = renderWithNames(['q', 'w', 'e', 'r']);
  checkRenderResult(res.state, res.renderResult);
  res = renderWithNames(['q', 'w', 'e', 'r', 't', 'y']);
  checkRenderResult(res.state, res.renderResult);
});

test('clicking any button selects that player as dealer, even if a dealer is already selected', () => {
  const names = ['q', 'w', 'e', 'r'];
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

test('clicking any button selects that player as dealer, clicking again unselects', () => {
  const names = ['q', 'w', 'e', 'r'];
  const res = renderWithNames(names);
  const { getAllByRole } = res.renderResult;
  const selectDealerBtns = getAllByRole('button').slice(0, 3);
  selectDealerBtns.forEach((b, i) => {
    act(() => {
      fireEvent.click(b);
    });
    expect(res.dispatch).toHaveBeenLastCalledWith(actions.selectDealer(names[i]));
    // we have to manually update state since dispatch is mocked
    res.state.dealer = names[i];
    act(() => {
      fireEvent.click(b);
    });
    expect(res.dispatch).toHaveBeenLastCalledWith(actions.unselectDealer());
  });
});
