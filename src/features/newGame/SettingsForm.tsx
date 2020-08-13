import React, { useContext } from 'react';

import { Box, Button, Checkbox, Dialog, FieldStack, FieldWrapper, Icon, Modal, Radio, Set } from 'bumbag';
import { Form, Formik } from 'formik';

import { newGameContext } from './NewGame';
import { actions, GameSettings } from './slice';

const initialValues: GameSettings = {
  scoringMode: 'negative',
  bonusRounds: true,
};

export const SettingsForm: React.FunctionComponent = () => {
  const { dispatch } = useContext(newGameContext);

  const onClickPrev = () => {
    dispatch(actions.decrementIdx());
  };
  const onSubmit = (values: GameSettings) => {
    dispatch(actions.setSettings(values));
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <FieldStack>
            <FieldWrapper label='Scoring Mode'>
              <React.Fragment>
                <Set>
                  <Box width='25%'>
                    <Radio
                      label='Standard Scoring'
                      checked={values.scoringMode === 'standard'}
                      onChange={() => setFieldValue('scoring', 'standard')}
                    />
                  </Box>
                  <SettingExplainerModal title='Standard Scoring'>
                    Players are awarded one point for each trick they take, plus a bonus of 10 points for hitting their
                    bid.
                  </SettingExplainerModal>
                </Set>
                <Set>
                  <Box width='25%'>
                    <Radio
                      label='Negative Scoring'
                      checked={values.scoringMode === 'negative'}
                      onChange={() => setFieldValue('scoring', 'negative')}
                    />
                  </Box>
                  <SettingExplainerModal title='Negative Scoring'>
                    Players are awarded 10 plus one point for each trick they take if they hit their bid, otherwise they
                    receive negative points equal to the difference between bid and actual tricks taken.
                  </SettingExplainerModal>
                </Set>
              </React.Fragment>
            </FieldWrapper>
            <FieldWrapper label='Bonus Rounds'>
              <Set>
                <Box width='25%'>
                  <Checkbox
                    label='Use bonus rounds'
                    checked={values.bonusRounds}
                    onChange={() => {
                      setFieldValue('bonusRounds', !values.bonusRounds);
                    }}
                  />
                </Box>
                <SettingExplainerModal title='Bonus Rounds'>
                  Rounds with the most cards for the given number of players are bonus rounds. In a bonus round, players
                  are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.
                </SettingExplainerModal>
              </Set>
            </FieldWrapper>
            <Set>
              <Button onClick={onClickPrev} iconBefore='solid-arrow-left'>
                Select Dealer
              </Button>
              <Button type='submit' palette='primary'>
                Create Game!
              </Button>
            </Set>
          </FieldStack>
        </Form>
      )}
    </Formik>
  );
};

interface SettingExplainerModalProps {
  title: string;
  children: string;
}

const SettingExplainerModal: React.FunctionComponent<SettingExplainerModalProps> = ({ title, children }) => (
  <Modal.State>
    <Dialog.Modal baseId='standard' type='info' title={title} showCloseButton>
      {children}
    </Dialog.Modal>
    <Modal.Disclosure>
      <Icon icon='solid-question-circle' />
    </Modal.Disclosure>
  </Modal.State>
);
