import React, { useContext } from 'react';

import { Button, Flex, PageWithHeader, TopNav } from 'bumbag';
import { Redirect } from 'react-router-dom';

import { NewGameContext } from '../../shared/newGame/context';
import { defaultRequest } from '../../shared/newGame/types';
// TODO map through the players and make player cards for each
// import { PlayerCard } from './PlayerCard';

export const Game: React.FunctionComponent = () => {
  const { request: newGameRequest } = useContext(NewGameContext);
  return (
    <PageWithHeader
      sticky
      header={
        <TopNav>
          <TopNav.Section marginLeft='major-2'>
            <TopNav.Item>
              <Button>Reset Bids</Button>
            </TopNav.Item>
            <TopNav.Item>
              <Button>Submit Bids</Button>
            </TopNav.Item>
          </TopNav.Section>
          <TopNav.Section marginRight='major-2'>
            <TopNav.Item>
              <Button palette='danger'>Delete Game</Button>
            </TopNav.Item>
          </TopNav.Section>
        </TopNav>
      }
    >
      <Flex flexDirection='row' flexWrap='wrap'>
        {/* {[0, 1, 2, 3, 4, 5, 6].map(v => (
          <PlayerCard
            key={v}
            name='test'
            dealerName='test'
            stats={{
              currentBid: 0,
              bidsPerRound: 0,
              hitPercentage: 0,
              pointsBack: 0,
              pointsPerRound: 0,
              score: 0,
              totalBids: 0,
              tricksPerRound: 0,
            }}
          />
        ))} */}
        {newGameRequest === defaultRequest ? <Redirect to='/' /> : <div>{JSON.stringify(newGameRequest)}</div>}
      </Flex>
    </PageWithHeader>
  );
};
