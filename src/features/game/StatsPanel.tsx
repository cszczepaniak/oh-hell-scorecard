import React, { useState } from 'react';

import { applyTheme, Button, Table } from 'bumbag';

import { styles } from '../../shared/components/ghostPlusButton/GhostPlusButton';
import { IGameStats } from './types';

interface IStatsPanelProps {
  stats: IGameStats;
}

const GhostPlusButtonLeftAligned = applyTheme(Button, {
  styles: {
    ...styles,
    base: {
      ...styles.base,
      paddingLeft: '0',
    },
  },
});

export const StatsPanel: React.FunctionComponent<IStatsPanelProps> = ({ stats }) => {
  const [showStats, setShowStats] = useState(false);
  return (
    <div>
      <GhostPlusButtonLeftAligned
        iconBefore={showStats ? 'solid-chevron-down' : 'solid-chevron-right'}
        onClick={() => setShowStats(!showStats)}
      >
        {showStats ? 'Hide ' : 'Show '}Stats
      </GhostPlusButtonLeftAligned>
      {showStats && (
        <Table variant='minimal'>
          <Table.Row>
            <Table.Cell>bidsPerRound</Table.Cell>
            <Table.Cell>{stats.bidsPerRound}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>hitPercentage</Table.Cell>
            <Table.Cell>{stats.hitPercentage}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>pointsBack</Table.Cell>
            <Table.Cell>{stats.pointsBack}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>pointsPerRound</Table.Cell>
            <Table.Cell>{stats.pointsPerRound}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>totalBids</Table.Cell>
            <Table.Cell>{stats.totalBids}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>tricksPerRound</Table.Cell>
            <Table.Cell>{stats.tricksPerRound}</Table.Cell>
          </Table.Row>
        </Table>
      )}
    </div>
  );
};
