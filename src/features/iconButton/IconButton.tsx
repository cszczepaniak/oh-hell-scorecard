import { applyTheme, Button } from 'bumbag';

const buttonStyles = {
  background: '#ffffff',
  border: 'none',
  boxShadow: 'none',
};
export const IconButton = applyTheme(Button, {
  styles: {
    base: buttonStyles,
    focus: buttonStyles,
    hover: buttonStyles,
    hoveractive: buttonStyles,
  },
});
