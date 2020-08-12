import React, { useContext } from 'react';

import { Button, Icon, RadioGroup, Set, Stack, Tooltip } from 'bumbag';

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
      <Set>
        <RadioGroup
          name='scoringOption'
          orientation='horizontal'
          options={[
            { label: 'Standard Scoring', value: 'standardScoring' },
            { label: 'Negative Scoring', value: 'negativeScoring' },
          ]}
        />
        <Tooltip content={scoringToolTipText} placement='right'>
          <Icon icon='solid-question-circle' />
        </Tooltip>
      </Set>
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

const scoringToolTipText =
  'Standard Scoring: Players are awarded one point for each trick they take, plus a bonus of 10 points for hitting their bid. Negative Scoring: Players are awarded 10 plus one point for each trick they take if they hit their bid, otherwise they receive negative points equal to the difference between bid and actual tricks taken';
