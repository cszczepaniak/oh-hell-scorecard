import React, { useContext } from 'react';

import { Button, ButtonProps } from 'bumbag';

import { DisplayContext } from './context';

interface IBackButtonProps {
  direction: 'forward' | 'back';
  onClick?: () => void;
  children: string;
}

export const NavButton: React.FunctionComponent<IBackButtonProps & ButtonProps> = (props) => {
  const { next, previous } = useContext(DisplayContext);
  const { direction, onClick, children } = props;

  return (
    <Button
      {...props}
      iconBefore={direction === 'back' ? 'solid-arrow-left' : ''}
      iconAfter={direction === 'forward' ? 'solid-arrow-right' : ''}
      onClick={() => {
        if (direction === 'forward') {
          next();
        } else {
          previous();
        }
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Button>
  );
};
