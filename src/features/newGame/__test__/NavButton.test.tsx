import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';

import { DisplayContext } from '../context';
import { NavButton } from '../NavButton';

const cleanupDOM = () => {
  document.getElementsByTagName('html')[0].innerHTML = '';
};

test('button calls the correct event based on direction prop', () => {
  const mockNext = jest.fn();
  const mockPrev = jest.fn();

  interface test {
    direction: 'forward' | 'back';
    expectedHandler: () => void;
  }

  const tests: test[] = [
    {
      direction: 'forward',
      expectedHandler: mockNext,
    },
    {
      direction: 'back',
      expectedHandler: mockPrev,
    },
  ];
  tests.forEach(t => {
    const { getByRole } = render(
      <DisplayContext.Provider value={{ displayIdx: 0, next: mockNext, previous: mockPrev }}>
        <NavButton direction={t.direction}>a</NavButton>
      </DisplayContext.Provider>,
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(t.expectedHandler).toHaveBeenCalled();
    cleanupDOM();
  });
});

test('button calls no event when the button is disabled', () => {
  const mockNext = jest.fn();
  const mockPrev = jest.fn();

  interface test {
    direction: 'forward' | 'back';
  }

  const tests: test[] = [
    {
      direction: 'forward',
    },
    {
      direction: 'back',
    },
  ];
  tests.forEach(t => {
    const { getByRole } = render(
      <DisplayContext.Provider value={{ displayIdx: 0, next: mockNext, previous: mockPrev }}>
        <NavButton direction={t.direction} disabled>
          a
        </NavButton>
      </DisplayContext.Provider>,
    );
    const btn = getByRole('button');
    fireEvent.click(btn);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockPrev).not.toHaveBeenCalled();
    cleanupDOM();
  });
});

test('button renders the correct children', () => {
  const testText = 'abc';
  const { getByText } = render(<NavButton direction='forward'>{testText}</NavButton>);
  getByText(testText);
});

test('button calls the onclick handler if it is passed', () => {
  const testText = 'abc';
  const mockHandleClick = jest.fn();
  const { getByText } = render(
    <NavButton direction='forward' onClick={mockHandleClick}>
      {testText}
    </NavButton>,
  );
  const button = getByText(testText);
  act(() => {
    fireEvent.click(button);
  });
  expect(mockHandleClick).toHaveBeenCalled();
});
