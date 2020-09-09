import React from 'react';

import { render, screen, act, fireEvent } from '@testing-library/react';

import { PlayerCard } from '../PlayerCard';

test('player card displays player name', () => {
  const name = 'bob';
  render(
    <PlayerCard
      name={name}
      dealerName=''
      stats={{
        bidsPerRound: 0,
        currentBid: 0,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  expect(screen.getByText(name)).toBeInTheDocument();
});

test('player card indicates if a player is dealing', () => {
  const name = 'bob';
  render(
    <PlayerCard
      name={name}
      dealerName={name}
      stats={{
        bidsPerRound: 0,
        currentBid: 0,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  expect(screen.getByText(/dealer/i)).toBeInTheDocument();
});

test('player card displays score', () => {
  const score = 123;
  render(
    <PlayerCard
      name='testPlayer'
      dealerName=''
      stats={{
        bidsPerRound: 0,
        currentBid: 0,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: score,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  expect(screen.getByText(`${score}`)).toBeInTheDocument();
});

test('player card displays bid', () => {
  const currentBid = 7;
  render(
    <PlayerCard
      name='testPlayer'
      dealerName=''
      stats={{
        bidsPerRound: 0,
        currentBid: currentBid,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  const regex = new RegExp(`current bid:\\s+${currentBid}`, 'i');
  expect(screen.getByText(regex)).toBeInTheDocument();
});

test('stats panel is shown if the button is clicked', () => {
  const name = 'testPlayer';
  render(
    <PlayerCard
      name={name}
      dealerName=''
      stats={{
        bidsPerRound: 0,
        currentBid: 0,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  act(() => {
    fireEvent.click(screen.getByText(/view stats/i));
  });
  expect(screen.getByText(`${name}'s stats`)).toBeInTheDocument();
});

test('bid menu is shown if the button is clicked', () => {
  render(
    <PlayerCard
      name='testPlayer'
      dealerName=''
      stats={{
        bidsPerRound: 0,
        currentBid: 0,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      }}
    />,
  );
  act(() => {
    fireEvent.click(screen.getByText('Bid'));
  });
  expect(screen.getByTestId('BidDropdown')).toBeInTheDocument();
});
