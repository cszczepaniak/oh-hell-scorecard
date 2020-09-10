import React from 'react';

import { Button, Flex, PageWithHeader, TopNav } from 'bumbag';

import { useSavedGame } from '../../shared/persistence/persistence';
import { PlayerCard } from './PlayerCard';

export const Game: React.FunctionComponent = () => {
  const { game, deleteGame } = useSavedGame();
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
              <Button palette='danger' onClick={() => deleteGame()}>
                Delete Game
              </Button>
            </TopNav.Item>
          </TopNav.Section>
        </TopNav>
      }
    >
      <Flex flexDirection='row' flexWrap='wrap'>
        {game.playerNames.map(n => (
          <PlayerCard key={n} name={n} dealerName={game.dealer} stats={game.playerStats[n]} />
        ))}
      </Flex>
    </PageWithHeader>
  );
};
