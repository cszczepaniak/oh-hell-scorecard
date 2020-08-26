import React from 'react';

import { render } from '@testing-library/react';

import App from '../App';

// we have to set up a mock for window.matchMedia, otherwise we get an error
// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('app renders home page', () => {
  const { getByText } = render(<App />);
  expect(getByText(/oh hell scorecard/i)).toBeInTheDocument();
});
