import React from 'react';
import {
  Box,
  Button,
  Group,
  Heading,
  InputField,
  PageContent,
  Stack,
  Icon,
} from 'bumbag';
import { useState } from 'react';

const minPlayers = 3;
const maxPlayers = 10;

const Home = () => {
  const [numPlayers, setNumPlayers] = useState(4);
  const createIncrementBy = (n: number) => () => {
    if (numPlayers > minPlayers && numPlayers < maxPlayers) {
      setNumPlayers(numPlayers + n);
    }
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Box>
      <PageContent>
        <Heading>Oh Hell Scorecard</Heading>
        <form onSubmit={onSubmit}>
          <Stack>
            {Array(numPlayers)
              .fill(0)
              .map((_, i) => (
                <InputField
                  key={i}
                  placeholder={`Player ${i + 1}'s Name`}
                  isRequired
                />
              ))}
            <Group>
              <Button onClick={createIncrementBy(1)}>
                <Icon icon='solid-plus' />
              </Button>
              <Button onClick={createIncrementBy(-1)}>
                <Icon icon='solid-minus' />
              </Button>
            </Group>
            <Button palette='primary' type='submit'>
              Create Game
            </Button>
          </Stack>
        </form>
      </PageContent>
    </Box>
  );
};

Home.propTypes = {};

export default Home;
