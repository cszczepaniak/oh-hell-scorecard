import React, { useContext } from 'react';

import { Button, RadioGroup, Set, Stack } from 'bumbag';

import { newGameContext } from './NewGame';
import { actions } from './slice';

export const SettingsForm: React.FunctionComponent = () => {
  const { dispatch } = useContext(newGameContext);

  const onClickPrev = () => {
    dispatch(actions.decrementIdx());
  };
  const onSubmit = () => {
    console.log('Creating game...');
  };

  return (
    <Stack>
      <RadioGroup
        name='scoringOption'
        orientation='horizontal'
        options={[
          { label: 'Standard Scoring', value: 'standardScoring' },
          { label: 'Negative Scoring', value: 'negativeScoring' },
        ]}
      />
      <Set>
        <Button onClick={onClickPrev} iconBefore='solid-arrow-left'>
          Select Dealer
        </Button>
        <Button onClick={onSubmit} palette='primary'>
          Create Game!
        </Button>
      </Set>
    </Stack>
  );
};
