import React from 'react';

import clsx from 'clsx';

import { PreGameShell } from '../../../components/shared/PreGameShell';
import { SelectDealerFormUIProps } from './SelectDealerForm';

export const SelectDealerFormUI: React.FunctionComponent<SelectDealerFormUIProps> = ({
    playerNames,
    dealer,
    handleDealerChange,
    handleClickBack,
    handleClickNext,
    error,
    showError,
}) => {
    return (
        <PreGameShell title='Select Dealer' onClickNext={handleClickNext} onClickBack={handleClickBack}>
            {playerNames.map(n => (
                <button
                    key={n}
                    onClick={() => handleDealerChange(n)}
                    className={clsx(
                        n === dealer && ['bg-blue-500', 'hover:bg-blue-500', 'text-white', 'border', 'border-blue-500'],
                        n !== dealer && ['bg-white', 'hover:bg-blue-100', 'text-black', 'border', 'border-black'],
                    )}
                >
                    {n}
                </button>
            ))}
            <div className={clsx('text-red-600', 'italic', { ['hidden']: !showError || !error })}>{error}</div>
        </PreGameShell>
    );
};
