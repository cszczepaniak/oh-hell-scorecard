import React from 'react';

import { Dialog } from '@material-ui/core';

import { SettingsFormUIProps } from './SettingsForm';

export const SettingsFormUI: React.FunctionComponent<SettingsFormUIProps> = ({
    bonusRoundModalOpen,
    setBonusRoundModalOpen,
    scoringModeModalOpen,
    setScoringModeModalOpen,
    bonusRounds,
    setBonusRounds,
    scoringMode,
    handleScoringModeChange,
    handleSubmit,
}) => {
    return (
        <div className='flex flex-col items-center bg-white max-w-md mx-auto h-screen sm:h-full sm:my-8 p-4 sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-md'>
            <h1 className='text-4xl mt-2 mb-4'>Game Settings</h1>
            <div className='flex flex-col space-y-4 w-full max-w-xs'>
                <div className='flex justify-between items-center'>
                    <div className='flex-1'>
                        <input
                            id='bonus-rounds'
                            type='checkbox'
                            className='mr-2'
                            checked={bonusRounds}
                            onChange={() => setBonusRounds(!bonusRounds)}
                        />
                        <label htmlFor='bonus-rounds'>Bonus Rounds</label>
                    </div>
                    <button
                        onClick={() => setBonusRoundModalOpen(true)}
                        className='ml-8 bg-black text-white font-medium rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-700'
                    >
                        ?
                    </button>
                </div>
                <Dialog open={bonusRoundModalOpen} onClose={() => setBonusRoundModalOpen(false)}>
                    <div className='m-4'>
                        <h3 className='font-semibold text-lg'>Bonus Rounds</h3>
                        <p>
                            Rounds with the most cards for the given number of players are bonus rounds. In a bonus
                            round, players are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.
                        </p>
                    </div>
                </Dialog>
                <div>
                    <p className='mb-1'>Scoring Mode</p>
                    <div className='flex justify-between items-center'>
                        <select onChange={handleScoringModeChange} value={scoringMode} className='flex-1'>
                            <option value='Negative'>Negative</option>
                            <option value='Standard'>Standard</option>
                        </select>
                        <button
                            onClick={() => setScoringModeModalOpen(true)}
                            className='ml-8 bg-black text-white font-medium rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-700'
                        >
                            ?
                        </button>
                    </div>
                </div>
                <Dialog open={scoringModeModalOpen} onClose={() => setScoringModeModalOpen(false)}>
                    <div className='m-4'>
                        <h3 className='font-semibold text-lg'>Scoring Mode</h3>
                        <p>
                            Players are awarded 10 plus one point for each trick they take if they hit their bid,
                            otherwise they receive negative points equal to the difference between bid and actual tricks
                            taken.
                        </p>
                    </div>
                </Dialog>
                <button onClick={handleSubmit}>Start Game</button>
            </div>
        </div>
    );
};
