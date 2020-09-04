import { applyTheme, Button } from 'bumbag';

const ghostPlusButtonStyles = {
  background: '#ffffff',
  border: 'none',
  boxShadow: 'none',
};
export const GhostPlusButton = applyTheme(Button, {
  styles: {
    base: ghostPlusButtonStyles,
    focus: ghostPlusButtonStyles,
    hover: ghostPlusButtonStyles,
    hoveractive: ghostPlusButtonStyles,
  },
});
