import React from 'react';

import { Table } from 'bumbag';

import { IGameStats } from './types';

interface IStatsPanelProps {
  stats: IGameStats;
}

export const StatsPanel: React.FunctionComponent<IStatsPanelProps> = ({ stats }) => {
  return (
    <Table variant='minimal' data-testid='StatsPanel'>
      <Table.Body>
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
      </Table.Body>
    </Table>
  );
};
