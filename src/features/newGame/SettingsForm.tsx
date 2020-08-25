import React, { useContext } from 'react';

import { Button, Checkbox, FieldStack, FieldWrapper, Heading, Radio, Set } from 'bumbag';

import { NewGameContext } from './context';
import { NavButton } from './NavButton';
import { SettingExplainerWrapper } from './SettingExplainerWrapper';
import { actions } from './slice';
import { ScoringMode, INewGameState } from './types';

interface ISettingsFormProps {
  handleCreateGame: (state: INewGameState) => void;
}

export const SettingsForm: React.FunctionComponent<ISettingsFormProps> = ({ handleCreateGame }) => {
  const { state, dispatch } = useContext(NewGameContext);

  return (
    <React.Fragment>
      <Heading use='h5'>Choose settings</Heading>
      <FieldStack>
        <FieldWrapper label='Scoring Mode'>
          <React.Fragment>
            <SettingExplainerWrapper text='Players are awarded one point for each trick they take, plus a bonus of 10 points for hitting their bid.'>
              <Radio
                label='Standard Scoring'
                checked={state.settings.scoringMode === ScoringMode.Standard}
                onChange={() => {
                  dispatch(actions.setScoringMode(ScoringMode.Standard));
                }}
              />
            </SettingExplainerWrapper>
            <SettingExplainerWrapper text='Players are awarded 10 plus one point for each trick they take if they hit their bid, otherwise they receive negative points equal to the difference between bid and actual tricks taken.'>
              <Radio
                label='Negative Scoring'
                checked={state.settings.scoringMode === ScoringMode.Negative}
                onChange={() => {
                  dispatch(actions.setScoringMode(ScoringMode.Negative));
                }}
              />
            </SettingExplainerWrapper>
          </React.Fragment>
        </FieldWrapper>
        <FieldWrapper label='Bonus Rounds'>
          <SettingExplainerWrapper text='Rounds with the most cards for the given number of players are bonus rounds. In a bonus round, players are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.'>
            <Checkbox
              label='Use bonus rounds'
              checked={state.settings.bonusRounds}
              onChange={() => {
                dispatch(actions.toggleBonusRounds());
              }}
            />
          </SettingExplainerWrapper>
        </FieldWrapper>
        <Set>
          <NavButton direction='back'>Select Dealer</NavButton>
          <Button type='button' onClick={() => handleCreateGame(state)} palette='primary'>
            Create Game!
          </Button>
        </Set>
      </FieldStack>
    </React.Fragment>
  );
};
