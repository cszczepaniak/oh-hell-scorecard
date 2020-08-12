import React, { useContext } from 'react';

import { Box, Button, Stack, Heading, InputField, Text, Set } from 'bumbag';
import { Formik, Form, Field, FieldArray, getIn, FieldProps } from 'formik';
import * as Yup from 'yup';

import { newGameContext } from './NewGame';
import PlusMinusButtonGroup from './PlusMinusButtonGroup';
import { actions } from './slice';

const FormSchema = Yup.object().shape({
  playerNames: Yup.array().of(Yup.string().required('Name is required')),
});

export interface PlayerNameFormData {
  playerNames: string[];
}

export const PlayerNamesForm: React.FunctionComponent = () => {
  const context = useContext(newGameContext);

  const onClickClearNames = (resetForm: () => void) => () => {
    resetForm();
    context.dispatch(actions.setPlayerNames([]));
  };

  return (
    <Formik
      initialValues={
        context.state.playerNames.length > 0
          ? { playerNames: context.state.playerNames }
          : { playerNames: Array(4).fill('') }
      }
      onSubmit={(values: PlayerNameFormData) => {
        context.dispatch(actions.setPlayerNames(values.playerNames));
        context.dispatch(actions.incrementIdx());
      }}
      validationSchema={FormSchema}
    >
      {({ values, resetForm }) => (
        <Form>
          <Heading use='h5'>Enter player names</Heading>
          <FieldArray name='playerNames'>
            {(arrayHelper) => (
              <Stack spacing='major-3'>
                <FormInputs names={values.playerNames} />
                <Set>
                  <PlusMinusButtonGroup arrayHelper={arrayHelper} arrayLen={values.playerNames.length} />
                  <Button onClick={onClickClearNames(resetForm)}>Clear Names</Button>
                </Set>
                <Button type='submit' iconAfter='solid-arrow-right'>
                  Select Dealer
                </Button>
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
