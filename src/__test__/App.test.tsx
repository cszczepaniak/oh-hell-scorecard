import React from 'react';

import { render } from '@testing-library/react';

import App from '../App';

test('app renders home page', () => {
  const { getByText } = render(<App />);
  expect(getByText(/oh hell scorecard/i)).toBeInTheDocument();
});
