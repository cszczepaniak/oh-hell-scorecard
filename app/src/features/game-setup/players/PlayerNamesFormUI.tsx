import React from 'react';

import clsx from 'clsx';

import { PreGameShell } from '../../../components/shared/PreGameShell';
import { PlayerNamesFormUIProps } from './PlayerNamesForm';

export const PlayerNamesFormUI: React.FunctionComponent<PlayerNamesFormUIProps> = ({
    addPlayer,
    canAddPlayer,
    removePlayer,
    canRemovePlayer,
    errorText,
    validation,
    playerNames,
    setName,
    handleGoToNext,
    handlePlayerNameBlur,
    nextTo,
    backTo,
}) => {
    return (
        <PreGameShell title='Enter Player Names' nextTo={nextTo} backTo={backTo} onClickNext={handleGoToNext}>
            {playerNames.map((n, i) => (
                <div key={i} className='flex items-center space-x-4'>
                    <input
                        type='text'
                        placeholder={`Player ${i + 1} name`}
                        value={n}
                        onBlur={() => handlePlayerNameBlur(i)}
                        onChange={e => setName(e.target.value, i)}
                        className={clsx('min-w-0 flex-1', {
                            ['border-red-600']: validation[i].length > 0,
                            ['ring-red-600']: validation[i].length > 0,
                            ['focus:ring-red-600']: validation[i].length > 0,
                        })}
                    />
                    <button
                        onClick={() => removePlayer(i)}
                        disabled={!canRemovePlayer}
                        className={clsx(
                            'px-0',
                            'h-5',
                            'w-5',
                            'flex',
                            'items-center',
                            'justify-center',
                            'rounded-full',
                            canRemovePlayer && ['bg-red-600', 'hover:bg-red-800'],
                            !canRemovePlayer && ['bg-gray-400', 'hover:bg-gray-400', 'pointer-events-none'],
                        )}
                    >
                        <span className='w-2 h-0.5 bg-white' />
                    </button>
                </div>
            ))}
            {canAddPlayer && (
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={() => addPlayer('')}
                        className='h-10 flex-1 bg-transparent border border-gray-500 border-dashed text-gray-500 font-normal hover:bg-gray-100 italic'
                    >
                        New Player
                    </button>
                    <div className='h-5 w-5' />
                </div>
            )}
            <p className={clsx('text-red-600', 'italic', { ['hidden']: !errorText, ['inline']: errorText })}>
                {errorText}
            </p>
        </PreGameShell>
    );
};
