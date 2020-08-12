import React, { useState } from 'react';

import { Box, Heading, PageContent } from 'bumbag';

import { PlayerNamesForm, PlayerNameFormData } from './PlayerNamesForm';
import { SelectDealerForm } from './SelectDealerForm';
import { SettingsForm } from './SettingsForm';

const NewGame: React.FunctionComponent = () => {
  const [formIdx, setFormIdx] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [dealerName, setDealerName] = useState('');

  const incrementIdx = () => {
    setFormIdx(formIdx + 1);
  };
  const decrementIdx = () => {
    setFormIdx(formIdx - 1);
  };
  const assertIdx = (actIdx: number, expIdx: number, action: () => void) => {
    if (actIdx !== expIdx) {
      console.log('Bad time!');
      return;
    }
    action();
  };
  const onPlayerNamesSubmit = (values: PlayerNameFormData) => {
    assertIdx(formIdx, 0, () => {
      incrementIdx();
      setPlayerNames(values.playerNames);
    });
  };
  const onSelectDealerSubmit = (name: string) => {
    assertIdx(formIdx, 1, () => {
      incrementIdx();
      setDealerName(name);
    });
  };
  const onSettingsSubmit = () => {
    console.log('Creating game...');
    console.log({ playerNames, dealerName });
  };

  return (
    <Box>
      <PageContent>
        <Heading fontSize='2.5rem'>Oh Hell Scorecard</Heading>
        {formIdx === 0 && <PlayerNamesForm onSubmit={onPlayerNamesSubmit} />}
        {formIdx === 1 && (
          <SelectDealerForm playerNames={playerNames} onSubmit={onSelectDealerSubmit} onClickPrev={decrementIdx} />
        )}
        {formIdx === 2 && <SettingsForm onSubmit={onSettingsSubmit} onClickPrev={decrementIdx} />}
      </PageContent>
    </Box>
  );
};

export default NewGame;
