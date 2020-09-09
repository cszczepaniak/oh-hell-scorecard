import { applyTheme, Button } from 'bumbag';

const ghostStyles = {
  background: '#ffffff',
  border: 'none',
  boxShadow: 'none',
};

export const styles = {
  base: ghostStyles,
  focus: ghostStyles,
  hover: ghostStyles,
  hoveractive: ghostStyles,
};

export const GhostPlusButton = applyTheme(Button, { styles });
