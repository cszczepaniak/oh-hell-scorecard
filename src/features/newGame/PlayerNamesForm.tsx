import React from 'react';

import { Box, Button, Heading, InputField, Stack, Text } from 'bumbag';
import { Formik, Form, Field, FieldArray, getIn, FieldProps } from 'formik';
import * as Yup from 'yup';

import PlusMinusButtonGroup from './PlusMinusButtonGroup';

const FormSchema = Yup.object().shape({
  playerNames: Yup.array().of(Yup.string().required('Name is required')),
});

export interface PlayerNameFormData {
  playerNames: string[];
}

interface PlayerNamesFormProps {
  onSubmit: (values: PlayerNameFormData) => void;
}

export const PlayerNamesForm: React.FunctionComponent<PlayerNamesFormProps> = ({ onSubmit }) => {
  const initialValues: PlayerNameFormData = {
    playerNames: Array(4).fill(''),
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={FormSchema}>
      {({ values }) => (
        <Form>
          <Heading use='h5'>Enter player names</Heading>
          <FieldArray name='playerNames'>
            {(arrayHelper) => (
              <Stack spacing='major-3'>
                <FormInputs names={values.playerNames} />
                <PlusMinusButtonGroup arrayHelper={arrayHelper} arrayLen={values.playerNames.length} />
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
