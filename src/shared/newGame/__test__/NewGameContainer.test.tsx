import React, { useEffect, useContext } from 'react';

import { render, screen } from '@testing-library/react';

import { NewGameContext } from '../context';
import { NewGameContainer } from '../NewGameContainer';
import { defaultRequest, INewGameRequest, ScoringMode } from '../types';

test('new game context provides the default request', () => {
  render(<NewGameContext.Consumer>{value => <div>{JSON.stringify(value.request)}</div>}</NewGameContext.Consumer>);
  expect(screen.queryByText(JSON.stringify(defaultRequest))).toBeInTheDocument();
});

interface ITestContainerChildProps {
  testRequest: INewGameRequest;
}

const TestContainerChild: React.FunctionComponent<ITestContainerChildProps> = ({ testRequest }) => {
  const { request, setRequest } = useContext(NewGameContext);
  useEffect(() => {
    setRequest(testRequest);
  }, [setRequest, testRequest]);
  return <div>{JSON.stringify(request)}</div>;
};

test('new game container allows setting the request', () => {
  const testRequest = {
    playerNames: ['a', 'b', 'c', 'd'],
    dealer: 'a',
    settings: {
      bonusRounds: false,
      scoringMode: ScoringMode.Standard,
    },
  };
  render(
    <NewGameContainer>
      <TestContainerChild testRequest={testRequest} />
    </NewGameContainer>,
  );
  expect(screen.queryByText(JSON.stringify(testRequest))).toBeInTheDocument();
});
