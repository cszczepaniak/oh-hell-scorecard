import React from 'react';

import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export const Button: React.FunctionComponent<Props> = ({
    children,
    variant = 'primary',
    className,
    disabled,
    ...rest
}) => {
    const primaryStyles = ['bg-blue-500', 'hover:bg-blue-800'];
    const secondaryStyles = ['bg-gray-400', 'hover:bg-gray-500'];
    return (
        <button
            {...rest}
            className={clsx(
                className,
                disabled && ['hover:cursor-default'],
                variant === 'primary' && primaryStyles,
                variant === 'secondary' && secondaryStyles,
                'p-2',
                'text-white',
                'focus:outline-none',
                'font-medium',
                'rounded-md',
                'disabled:bg-gray-300',
                'disabled:text-gray-100',
                'disabled:hover:bg-gray-300',
            )}
            aria-disabled={disabled}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
