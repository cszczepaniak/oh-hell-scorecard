import React from 'react';

import { Card, Text } from 'bumbag';

import { StatsPanel } from './StatsPanel';
import { IGameStats } from './types';

interface IPlayerCardProps {
  name: string;
  dealerName: string;
  stats: IGameStats;
}

export const PlayerCard: React.FunctionComponent<IPlayerCardProps> = ({ name, dealerName, stats }) => {
  return (
    <Card title={name + (dealerName === name ? ' - dealer' : '')} margin='major-2' minWidth='250px'>
      <Text fontSize='1.5rem'>{stats.score}</Text>
      <div>
        <Text>Current bid: {stats.currentBid}</Text>
      </div>
      <StatsPanel stats={stats} />
    </Card>
  );
};
