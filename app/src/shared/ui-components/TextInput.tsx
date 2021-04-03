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
                {...rest}
                id={label}
                type='text'
                className={clsx(className, 'w-full', 'disabled:text-gray-400', 'disabled:bg-gray-100')}
                aria-disabled={disabled}
                disabled={disabled}
            />
        </div>
    );
};
