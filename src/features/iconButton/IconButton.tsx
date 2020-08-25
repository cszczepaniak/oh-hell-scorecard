import React from 'react';

import { applyTheme, Button, ButtonProps, Icon } from 'bumbag';

const buttonStyles = {
  background: '#ffffff',
  border: 'none',
  boxShadow: 'none',
};
const IconButtonWrapper = applyTheme(Button, {
  styles: {
    base: buttonStyles,
    focus: buttonStyles,
    hover: buttonStyles,
    hoveractive: buttonStyles,
  },
});

interface IIconButtonProps {
  icon: string;
}

export const IconButton: React.FunctionComponent<IIconButtonProps & ButtonProps> = ({ icon, ...rest }) => (
  <IconButtonWrapper {...rest}>
    <Icon icon={icon} />
  </IconButtonWrapper>
);
