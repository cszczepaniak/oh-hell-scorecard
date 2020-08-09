import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './app/store';

test('renders oh hell', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText(/oh hell/i)).toBeInTheDocument();
});
