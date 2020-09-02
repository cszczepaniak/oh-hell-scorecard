import React from 'react';

import { render } from '@testing-library/react';

import { NewGameConfigContext, DisplayContext } from '../context';

test('default dispatch on NewGameConfigContext throws error', () => {
  render(
    <NewGameConfigContext.Consumer>
      {value => {
        expect(() => value.dispatch({ type: '', payload: {} })).toThrowError();
        return <div></div>;
      }}
    </NewGameConfigContext.Consumer>,
  );
});

test('default next and prev on DisplayContext throw errors', () => {
  render(
    <DisplayContext.Consumer>
      {value => {
        expect(value.next).toThrowError();
        expect(value.previous).toThrowError();
        return <div></div>;
      }}
    </DisplayContext.Consumer>,
  );
});
