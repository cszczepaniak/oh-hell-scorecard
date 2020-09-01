import React from 'react';

import { act, render, fireEvent, screen } from '@testing-library/react';

import { SettingExplainerWrapper } from '../SettingExplainerWrapper';

test('wrapper should show text when the button is clicked', () => {
  const text = 'explainer text';
  render(
    <SettingExplainerWrapper text={text}>
      <>asd</>
    </SettingExplainerWrapper>,
  );
  const button = screen.getByRole('button');
  expect(screen.queryByText(text)).not.toBeInTheDocument();
  act(() => {
    fireEvent.click(button);
  });
  expect(screen.getByText(text)).toBeInTheDocument();
});

test('wrapper should render children', () => {
  const childText = 'child';
  const child = <React.Fragment>{childText}</React.Fragment>;
  render(<SettingExplainerWrapper text='asd'>{child}</SettingExplainerWrapper>);
  expect(screen.getByText(childText)).toBeInTheDocument();
});
