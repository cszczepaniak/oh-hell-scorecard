import React from 'react';

import { Group, Button, Icon } from 'bumbag';
import { FieldArrayRenderProps } from 'formik';

import { minPlayers, maxPlayers } from './constants';

interface PlusMinusButtonGroupProps {
  arrayHelper: FieldArrayRenderProps;
  arrayLen: number;
}
const PlusMinusButtonGroup: React.FunctionComponent<PlusMinusButtonGroupProps> = ({ arrayHelper, arrayLen }) => {
  const increment = () => {
    if (arrayLen < maxPlayers) {
      arrayHelper.push('');
    }
  };
  const decrement = () => {
    if (arrayLen > minPlayers) {
      arrayHelper.remove(arrayLen - 1);
    }
  };
  return (
    <Group>
      <Button onClick={increment} disabled={arrayLen === maxPlayers}>
        <Icon icon='solid-plus' />
      </Button>
      <Button onClick={decrement} disabled={arrayLen === minPlayers}>
        <Icon icon='solid-minus' />
      </Button>
    </Group>
  );
};

export default PlusMinusButtonGroup;
