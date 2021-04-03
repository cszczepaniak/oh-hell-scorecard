import React from 'react';

import clsx from 'clsx';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const TextInput: React.FunctionComponent<Props> = ({ label, disabled, className, ...rest }) => {
    return (
        <div className='flex flex-col flex-1'>
            <label htmlFor={label}>{label}</label>
            <input
                id={label}
                type='text'
                {...rest}
                className={clsx(className, 'w-full', 'disabled:text-gray-400', 'disabled:bg-gray-100')}
                disabled={disabled}
            />
        </div>
    );
};
