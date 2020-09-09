import React from 'react';

import { Button, Card, DropdownMenu, Flex, Popover, Set, Text, useBreakpoint } from 'bumbag';

import { StatsPanel } from './StatsPanel';
import { IGameStats } from './types';

interface IPlayerCardProps {
  name: string;
  dealerName: string;
  stats: IGameStats;
}

export const PlayerCard: React.FunctionComponent<IPlayerCardProps> = ({ name, dealerName, stats }) => {
  const isMobile = useBreakpoint('mobile');
  return (
    <Card title={name + (dealerName === name ? ' - dealer' : '')} margin='major-2' width={isMobile ? '100%' : ''}>
      <Flex flexDirection='column'>
        <Text fontSize='1.5rem'>{stats.score}</Text>
        <Text>Current bid: {stats.currentBid}</Text>
        <Set marginTop='major-1'>
          <DropdownMenu
            menu={[0, 1, 2].map(v => (
              <DropdownMenu.Item key={v}>{v}</DropdownMenu.Item>
            ))}
            data-testid='BidDropdown'
          >
            <Button iconAfter='solid-chevron-down'>Bid</Button>
          </DropdownMenu>
          <Popover.State>
            <Popover.Disclosure use={Button}>View Stats</Popover.Disclosure>
            <Popover title={`${name}'s stats`} hasArrow tabIndex={0}>
              <StatsPanel stats={stats} />
            </Popover>
          </Popover.State>
        </Set>
      </Flex>
    </Card>
  );
};
