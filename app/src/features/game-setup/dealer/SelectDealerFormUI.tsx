import React from 'react';

import { PreGameShell } from '../../../components/shared/PreGameShell';
import { SelectDealerFormUIProps } from './SelectDealerForm';

export const SelectDealerFormUI: React.FunctionComponent<SelectDealerFormUIProps> = ({
    playerNames,
    handleDealerChange,
    handleClickBack,
    nextTo,
}) => {
    return (
        <PreGameShell title='Select Dealer' nextTo={nextTo} onClickBack={handleClickBack}>
            <select onChange={e => handleDealerChange(e.target.value)} className='w-full'>
                {playerNames.map(n => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                ))}
            </select>
        </PreGameShell>
    );
};
