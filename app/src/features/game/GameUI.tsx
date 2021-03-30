import React from 'react';

import clsx from 'clsx';

import { GameUIProps } from './Game';

export const GameUI: React.FunctionComponent<GameUIProps> = ({ game, togglePhase }) => {
    return (
        <div className='flex flex-col h-screen items-center'>
            <div className='flex-1 flex flex-col overflow-auto divide-y divide-gray-300 sm:divide-y-0 sm:space-y-4 sm:px-4 sm:max-w-xl'>
                <div className='flex flex-row text-base p-2 space-x-4 sm:text-xl'>
                    <h3>
                        Round<span className='hidden sm:inline'> Number</span>: {game.round}
                    </h3>
                    <h3>
                        <span className='hidden sm:inline'>Number of </span>Cards: {game.numberOfCards}
                    </h3>
                </div>
                {game.players.map(p => (
                    <div key={p.name} className='flex flex-col bg-white p-4  sm:rounded-md sm:shadow'>
                        <h4 className='font-semibold text-xl'>
                            {p.name}{' '}
                            <span
                                className={clsx(
                                    'italic',
                                    'font-normal',
                                    'text-sm',
                                    'ml-2',
                                    game.dealer !== p.name && 'hidden',
                                )}
                            >
                                (Dealer)
                            </span>
                        </h4>
                        <div className='flex flex-row justify-between space-x-4 sm:space-x-16'>
                            <div className='flex flex-col flex-1'>
                                Score: <div className='text-2xl'>{p.score}</div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                Bid: <input type='text' className='w-full' />
                            </div>
                            <div className='flex flex-col flex-1'>
                                Tricks: <input type='text' className='w-full' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-row w-full sm:justify-end space-x-4 px-4 sm:space-x-8 sm:px-8 py-2 border-t border-gray-400'>
                <button
                    className='flex-1 sm:flex-none sm:w-40'
                    disabled={game.phase === 'Scoring'}
                    onClick={togglePhase}
                >
                    Submit Bids
                </button>
                <button
                    className='flex-1 sm:flex-none sm:w-40'
                    disabled={game.phase === 'Bidding'}
                    onClick={togglePhase}
                >
                    Submit Tricks
                </button>
            </div>
        </div>
    );
};
