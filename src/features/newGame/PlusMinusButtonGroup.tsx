import React from 'react';

import { Group, Button, Icon } from 'bumbag';

interface PlusMinusButtonGroupProps {
  onIncrement: () => void;
  onDecrement: () => void;
  disablePlus: boolean;
  disableMinus: boolean;
}
const PlusMinusButtonGroup: React.FunctionComponent<PlusMinusButtonGroupProps> = ({
  onIncrement,
  onDecrement,
  disablePlus,
  disableMinus,
}) => {
  return (
    <Group>
      <Button onClick={onIncrement} disabled={disablePlus}>
        <Icon icon='solid-plus' />
      </Button>
      <Button onClick={onDecrement} disabled={disableMinus}>
        <Icon icon='solid-minus' />
      </Button>
    </Group>
  );
};

export default PlusMinusButtonGroup;
