import React, { useContext } from 'react';

import { Box, Button, Stack, Heading, InputField, Text, Set } from 'bumbag';
import { Formik, Form, Field, FieldArray, getIn, FieldProps } from 'formik';
import * as Yup from 'yup';

import { NewGameContext } from './context';
import { NavButton } from './NavButton';
import PlusMinusButtonGroup from './PlusMinusButtonGroup';
import { actions } from './slice';

const FormSchema = Yup.object().shape({
  playerNames: Yup.array().of(Yup.string().required('Name is required')),
});

export interface PlayerNameFormData {
  playerNames: string[];
}

interface PlayerNamesFormProps {
  minPlayers: number;
  maxPlayers: number;
}

export const PlayerNamesForm: React.FunctionComponent<PlayerNamesFormProps> = ({ minPlayers, maxPlayers }) => {
  const { state, dispatch } = useContext(NewGameContext);

  const onClickClearNames = (resetForm: () => void) => () => {
    resetForm();
    dispatch(actions.setPlayerNames([]));
  };

  return (
    <Formik
      initialValues={
        state.playerNames.length > 0 ? { playerNames: state.playerNames } : { playerNames: Array(4).fill('') }
      }
      onSubmit={(values: PlayerNameFormData) => {
        dispatch(actions.setPlayerNames(values.playerNames));
      }}
      validationSchema={FormSchema}
    >
      {({ values, resetForm, isValid }) => (
        <Form>
          <Heading use='h5'>Enter player names</Heading>
          <FieldArray name='playerNames'>
            {(arrayHelper) => (
              <Stack spacing='major-3'>
                <FormInputs names={values.playerNames} />
                <Set>
                  <PlusMinusButtonGroup
                    onIncrement={() => values.playerNames.length < maxPlayers && arrayHelper.push('')}
                    onDecrement={() =>
                      values.playerNames.length > minPlayers && arrayHelper.remove(values.playerNames.length - 1)
                    }
                    disablePlus={values.playerNames.length === maxPlayers}
                    disableMinus={values.playerNames.length === minPlayers}
                  />
                  <Button onClick={onClickClearNames(resetForm)}>Clear Names</Button>
                </Set>
                <NavButton direction='forward' type='submit' disabled={!isValid || values.playerNames.includes('')}>
                  Select Dealer
                </NavButton>
              </Stack>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

interface FormInputsProps {
  names: string[];
}
const FormInputs: React.FunctionComponent<FormInputsProps> = ({ names }) => (
  <React.Fragment>
    {names.map((_, i) => (
      <FieldWithError key={i} name={`playerNames[${i}]`} placeholder={`Player ${i + 1}`} />
    ))}
  </React.Fragment>
);

interface FieldWithErrorProps {
  name: string;
  placeholder: string;
}
const FieldWithError: React.FunctionComponent<FieldWithErrorProps> = ({ name, placeholder }) => (
  <Box marginBottom='major-3' position='relative'>
    <Field name={name} component={InputField.Formik} placeholder={placeholder} />
    <Box position='absolute'>
      <Field name={name}>
        {(props: FieldProps) => {
          const error = getIn(props.form.errors, name);
          const touch = getIn(props.form.touched, name);
          return <Text color='danger'>{touch && error ? error : ''}</Text>;
        }}
      </Field>
    </Box>
  </Box>
);
