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

  const handleClick = () => {
    if (direction === 'forward') {
      next();
    } else {
      previous();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      {...props}
      type='button'
      iconBefore={direction === 'back' ? 'solid-arrow-left' : ''}
      iconAfter={direction === 'forward' ? 'solid-arrow-right' : ''}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};
