import React, { useState } from 'react';

import { Box, Button, Stack, Heading, Set } from 'bumbag';

interface SelectDealerFormProps {
  playerNames: string[];
  onSubmit: (name: string) => void;
  onClickPrev: () => void;
}

export const SelectDealerForm: React.FunctionComponent<SelectDealerFormProps> = ({
  playerNames,
  onSubmit,
  onClickPrev,
}) => {
  const [dealerName, setDealerName] = useState('');

  const onClickName = (name: string) => () => {
    if (dealerName === name) {
      setDealerName('');
    } else {
      setDealerName(name);
    }
  };

  const onClickSubmit = () => {
    onSubmit(dealerName);
  };

  return (
    <React.Fragment>
      <Heading use='h5'>Choose dealer</Heading>
      <Stack spacing='major-3'>
        {playerNames.map((n, i) => (
          <Box key={i} display='block'>
            <Button width='100%' background={dealerName === n ? '#abcabc' : ''} onClick={onClickName(n)} alignX='left'>
              {n}
            </Button>
          </Box>
        ))}
        <Set>
          <Button iconBefore='solid-arrow-left' onClick={onClickPrev}>
            Player Names
          </Button>
          <Button iconAfter='solid-arrow-right' onClick={onClickSubmit}>
            Select Settings
          </Button>
        </Set>
      </Stack>
    </React.Fragment>
  );
};
