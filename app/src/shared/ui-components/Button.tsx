import React from 'react';

import clsx from 'clsx';

export const Button: React.FunctionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    disabled,
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={clsx(
                className,
                disabled && ['hover:cursor-default'],
                'disabled:bg-gray-300',
                'disabled:text-gray-100',
                'disabled:hover:bg-gray-300',
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
