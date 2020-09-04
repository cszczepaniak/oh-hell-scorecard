import React from 'react';

import { ButtonProps, Icon } from 'bumbag';

import { GhostPlusButton } from '../ghostPlusButton/GhostPlusButton';

interface IIconButtonProps {
  icon: string;
}

export const IconButton: React.FunctionComponent<IIconButtonProps & ButtonProps> = ({ icon, ...rest }) => (
  <GhostPlusButton {...rest}>
    <Icon icon={icon} />
  </GhostPlusButton>
);
