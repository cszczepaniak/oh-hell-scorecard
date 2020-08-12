import React, { useContext } from 'react';

import { Box, Button, Stack, Heading, Set } from 'bumbag';

import { newGameContext } from './NewGame';
import { actions } from './slice';

export const SelectDealerForm: React.FunctionComponent = () => {
  const context = useContext(newGameContext);

  const onClickName = (name: string) => () => {
    if (context.state.dealer === name) {
      context.dispatch(actions.unselectDealer());
    } else {
      context.dispatch(actions.selectDealer(name));
    }
  };
  const onClickPrev = () => {
    context.dispatch(actions.unselectDealer());
    context.dispatch(actions.decrementIdx());
  };
  const onClickSubmit = () => {
    context.dispatch(actions.incrementIdx());
  };

  return (
    <React.Fragment>
      <Heading use='h5'>Choose dealer</Heading>
      <Stack spacing='major-3'>
        {context.state.playerNames.map((n, i) => (
          <Box key={i} display='block'>
            <Button
              width='100%'
              background={context.state.dealer === n ? '#abcabc' : ''}
              onClick={onClickName(n)}
              alignX='left'
            >
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
