import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import PlusMinusButtonGroup from '../PlusMinusButtonGroup';

test('button event are fired and handled', () => {
  const mockOnIncrement = jest.fn();
  const mockOnDecrement = jest.fn();

  render(
    <PlusMinusButtonGroup
      onIncrement={mockOnIncrement}
      onDecrement={mockOnDecrement}
      disablePlus={false}
      disableMinus={false}
    />,
  );

  const btns = screen.getAllByRole('button');
  fireEvent.click(btns[0]);
  expect(mockOnIncrement).toHaveBeenCalledTimes(1);
  fireEvent.click(btns[1]);
  expect(mockOnDecrement).toHaveBeenCalledTimes(1);
});
