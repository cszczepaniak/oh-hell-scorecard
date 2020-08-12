import React from 'react';

import { Button, RadioGroup, Set, Stack } from 'bumbag';

interface SettingsFormProps {
  onSubmit: () => void;
  onClickPrev: () => void;
}

export const SettingsForm: React.FunctionComponent<SettingsFormProps> = ({ onSubmit, onClickPrev }) => {
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
