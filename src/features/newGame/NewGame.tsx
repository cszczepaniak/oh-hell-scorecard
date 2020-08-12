import React from 'react';

import { Box, Heading, PageContent } from 'bumbag';

import { PlayerNamesForm, PlayerNameFormData } from './PlayerNamesForm';

const NewGame: React.FunctionComponent = () => {
  const onPlayerNamesSubmit = (values: PlayerNameFormData) => {
    console.log(values);
  };

  return (
    <Box>
      <PageContent>
        <Heading fontSize='2.5rem'>Oh Hell Scorecard</Heading>
        <PlayerNamesForm onSubmit={onPlayerNamesSubmit} />
      </PageContent>
    </Box>
  );
};

export default NewGame;
