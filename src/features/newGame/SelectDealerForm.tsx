import React, { useContext } from 'react';

import { Box, Button, Stack, Heading, Set } from 'bumbag';

import { newGameContext } from './NewGame';
import { actions } from './slice';

export const SelectDealerForm: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(newGameContext);

  const onClickName = (name: string) => () => {
    if (state.dealer === name) {
      dispatch(actions.unselectDealer());
    } else {
      dispatch(actions.selectDealer(name));
    }
  };
  const onClickPrev = () => {
    dispatch(actions.unselectDealer());
    dispatch(actions.decrementIdx());
  };
  const onClickSubmit = () => {
    dispatch(actions.incrementIdx());
  };

  return (
    <React.Fragment>
      <Heading use='h5'>Choose dealer</Heading>
      <Stack spacing='major-3'>
        {state.playerNames.map((n, i) => (
          <Box key={i} display='block'>
            <Button
              width='100%'
              background={state.dealer === n ? '#abcabc' : ''}
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
