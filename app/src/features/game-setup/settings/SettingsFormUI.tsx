import React from 'react';

import { Modal } from '../../../components/shared/Modal';
import { PreGameShell } from '../../../components/shared/PreGameShell';
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
    backTo,
}) => {
    return (
        <>
            <Modal open={bonusRoundModalOpen} onClose={() => setBonusRoundModalOpen(false)}>
                <h3 className='font-semibold text-lg'>Bonus Rounds</h3>
                <p>
                    Rounds with the most cards for the given number of players are bonus rounds. In a bonus round,
                    players are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.
                </p>
            </Modal>
            <Modal open={scoringModeModalOpen} onClose={() => setScoringModeModalOpen(false)}>
                <h3 className='font-semibold text-lg'>Scoring Mode</h3>
                <p>
                    Players are awarded 10 plus one point for each trick they take if they hit their bid, otherwise they
                    receive negative points equal to the difference between bid and actual tricks taken.
                </p>
            </Modal>
            <PreGameShell title='Game Settings' backTo={backTo} onClickNext={handleSubmit} nextButtonText='Start Game'>
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
            </PreGameShell>
        </>
    );
};
