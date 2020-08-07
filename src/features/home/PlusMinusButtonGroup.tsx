import React from 'react';

import { FieldArrayRenderProps } from 'formik';
import { Group, Button, Icon } from 'bumbag';
import { minPlayers, maxPlayers } from './constants';

interface PlusMinusButtonGroupProps {
  arrayHelper: FieldArrayRenderProps;
  arrayLen: number;
}
const PlusMinusButtonGroup: React.FunctionComponent<PlusMinusButtonGroupProps> = ({ arrayHelper, arrayLen }) => {
  const increment = (_: React.MouseEvent) => {
    if (arrayLen < maxPlayers) {
      arrayHelper.push('');
    }
  };
  const decrement = (_: React.MouseEvent) => {
    if (arrayLen > minPlayers) {
      arrayHelper.remove(arrayLen - 1);
    }
  };
  return (
    <Group>
      <Button onClick={increment}>
        <Icon icon="solid-plus" />
      </Button>
      <Button onClick={decrement}>
        <Icon icon="solid-minus" />
      </Button>
    </Group>
  );
};

export default PlusMinusButtonGroup;
