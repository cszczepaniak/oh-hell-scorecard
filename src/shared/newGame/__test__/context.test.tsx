import React from 'react';

import { render } from '@testing-library/react';

import { NewGameContext } from '../context';

test('default dispatch on NewGameContext throws error', () => {
  render(
    <NewGameContext.Consumer>
      {value => {
        expect(() => value.setRequest(value.request)).toThrowError();
        return <div></div>;
      }}
    </NewGameContext.Consumer>,
  );
});
