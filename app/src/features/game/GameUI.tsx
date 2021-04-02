import React from 'react';

import clsx from 'clsx';

import { isBonus } from '../../lib/game/scoring';
import { GameUIProps } from './Game';

export const GameUI: React.FunctionComponent<GameUIProps> = ({
    game,
    phase,
    error,
    handleBidChange,
    handleTrickChange,
    handleSubmitBids,
    handleSubmitTricks,
}) => {
    return (
        <div className='flex flex-col h-screen items-center relative'>
            {error && (
                <div className='absolute bottom-16 right-0 w-full sm:w-96'>
                    <div className='flex flex-row m-2 border border-red-300 rounded-md p-2 bg-red-200'>{error}</div>
                </div>
            )}
            <div className='flex-1 flex flex-col overflow-auto divide-y divide-gray-300 sm:divide-y-0 sm:space-y-4 sm:px-4 sm:max-w-xl'>
                <div className='flex flex-row justify-between items-center p-2'>
                    <div className='flex flex-row text-base space-x-4 sm:text-xl'>
                        <h3>
                            Round<span className='hidden sm:inline'> Number</span>: {game.round}
                        </h3>
                        <h3>
                            <span className='hidden sm:inline'>Number of </span>Cards: {game.numberOfCards}
                        </h3>
                    </div>
                    {isBonus(game.players.length, game.numberOfCards) && <p className='italic'>Bonus round!</p>}
                </div>
                {game.players.map((p, i) => (
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
                                Bid:{' '}
                                <input
                                    type='text'
                                    onChange={e => handleBidChange(e, i)}
                                    value={game.players[i].currentBid}
                                    className={clsx('w-full', phase === 'Scoring' && ['text-gray-500 bg-gray-100'])}
                                    disabled={phase === 'Scoring'}
                                />
                            </div>
                            <div className='flex flex-col flex-1'>
                                Tricks:{' '}
                                <input
                                    type='text'
                                    onChange={e => handleTrickChange(e, i)}
                                    value={game.players[i].currentTricks}
                                    className={clsx('w-full', phase === 'Bidding' && ['text-gray-500 bg-gray-100'])}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-row w-full sm:justify-end space-x-4 px-4 sm:space-x-8 sm:px-8 py-2 border-t border-gray-400'>
                <button
                    className={clsx(
                        phase === 'Scoring' && [
                            'bg-gray-300',
                            'hover:bg-gray-300',
                            'hover:cursor-default',
                            'text-gray-100',
                        ],
                        'flex-1 sm:flex-none sm:w-40',
                    )}
                    disabled={phase === 'Scoring'}
                    onClick={handleSubmitBids}
                >
                    Submit Bids
                </button>
                <button
                    className={clsx(
                        phase === 'Bidding' && [
                            'bg-gray-300',
                            'hover:bg-gray-300',
                            'hover:cursor-default',
                            'text-gray-100',
                        ],
                        'flex-1 sm:flex-none sm:w-40',
                    )}
                    disabled={phase === 'Bidding'}
                    onClick={handleSubmitTricks}
                >
                    Submit Tricks
                </button>
            </div>
        </div>
    );
};
