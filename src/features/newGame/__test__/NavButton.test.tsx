import React from 'react';

import { act, cleanup, render, fireEvent, screen } from '@testing-library/react';

import { DisplayContext } from '../context';
import { NavButton } from '../NavButton';

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
    render(
      <DisplayContext.Provider value={{ displayIdx: 0, next: mockNext, previous: mockPrev }}>
        <NavButton direction={t.direction}>a</NavButton>
      </DisplayContext.Provider>,
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(t.expectedHandler).toHaveBeenCalled();
    cleanup();
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
    render(
      <DisplayContext.Provider value={{ displayIdx: 0, next: mockNext, previous: mockPrev }}>
        <NavButton direction={t.direction} disabled>
          a
        </NavButton>
      </DisplayContext.Provider>,
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockPrev).not.toHaveBeenCalled();
    cleanup();
  });
});

test('button renders the correct children', () => {
  const testText = 'abc';
  render(<NavButton direction='forward'>{testText}</NavButton>);
  screen.getByText(testText);
});

test('button calls the onclick handler if it is passed', () => {
  const testText = 'abc';
  const mockHandleClick = jest.fn();
  render(
    <NavButton direction='forward' onClick={mockHandleClick}>
      {testText}
    </NavButton>,
  );
  const button = screen.getByText(testText);
  act(() => {
    fireEvent.click(button);
  });
  expect(mockHandleClick).toHaveBeenCalled();
});
