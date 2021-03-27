import React from 'react';

import { SelectDealerFormUIProps } from './SelectDealerForm';

export const SelectDealerFormUI: React.FunctionComponent<SelectDealerFormUIProps> = ({
    playerNames,
    handleDealerChange,
    handleClickBack,
    handleClickNext,
}) => {
    return (
        <div className='flex flex-col space-y-4 items-center bg-white max-w-md mx-auto h-screen sm:h-full sm:my-8 p-4 sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-md'>
            <h3 className='font-semibold text-lg'>Select Dealer</h3>
            <div className='px-8 w-full flex flex-col space-y-4'>
                <select onChange={e => handleDealerChange(e.target.value)} className='w-full'>
                    {playerNames.map(n => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
                <div className='flex space-x-4'>
                    <button onClick={handleClickBack} className='btn-secondary w-full'>
                        Back
                    </button>
                    <button onClick={handleClickNext} className='w-full'>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
