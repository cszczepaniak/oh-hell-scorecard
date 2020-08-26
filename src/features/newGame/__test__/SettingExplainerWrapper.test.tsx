import React from 'react';

import { act, render, fireEvent } from '@testing-library/react';

import { SettingExplainerWrapper } from '../SettingExplainerWrapper';

test('wrapper should show text when the button is clicked', () => {
  const text = 'explainer text';
  const { getByRole, getByText, queryByText } = render(
    <SettingExplainerWrapper text={text}>
      <>asd</>
    </SettingExplainerWrapper>,
  );
  const button = getByRole('button');
  expect(queryByText(text)).not.toBeInTheDocument();
  act(() => {
    fireEvent.click(button);
  });
  expect(getByText(text)).toBeInTheDocument();
});

test('wrapper should render children', () => {
  const childText = 'child';
  const child = <React.Fragment>{childText}</React.Fragment>;
  const { getByText } = render(<SettingExplainerWrapper text='asd'>{child}</SettingExplainerWrapper>);
  expect(getByText(childText)).toBeInTheDocument();
});
