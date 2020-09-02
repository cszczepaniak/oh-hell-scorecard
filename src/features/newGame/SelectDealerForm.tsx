import React, { useContext } from 'react';

import { Box, Button, Stack, Heading, Set } from 'bumbag';

import { NewGameConfigContext } from './context';
import { NavButton } from './NavButton';
import { actions } from './slice';

export const SelectDealerForm: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(NewGameConfigContext);

  const dealerIsValid = () => {
    return state.dealer && state.playerNames.includes(state.dealer);
  };
  const onClickName = (name: string) => () => {
    if (state.dealer === name) {
      dispatch(actions.unselectDealer());
    } else {
      dispatch(actions.selectDealer(name));
    }
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
          <NavButton direction='back' onClick={() => dispatch(actions.unselectDealer())}>
            Player Names
          </NavButton>
          <NavButton direction='forward' disabled={!dealerIsValid()}>
            Select Settings
          </NavButton>
        </Set>
      </Stack>
    </React.Fragment>
  );
};
