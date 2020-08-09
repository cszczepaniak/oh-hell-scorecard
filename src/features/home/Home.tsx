import React from 'react';
import { Formik, Form, Field, FieldArray, getIn, FieldProps } from 'formik';
import { Box, Button, Heading, InputField, PageContent, Stack, Text } from 'bumbag';
import * as Yup from 'yup';

import PlusMinusButtonGroup from './PlusMinusButtonGroup';

interface FormData {
  playerNames: string[];
}
const FormSchema = Yup.object().shape({
  playerNames: Yup.array().of(Yup.string().required('Name is required')),
});

const Home: React.FunctionComponent = () => {
  const initialValues: FormData = {
    playerNames: Array(4).fill(''),
  };
  return (
    <Box>
      <PageContent>
        <Heading fontSize="2.5rem">Oh Hell Scorecard</Heading>
        <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)} validationSchema={FormSchema}>
          {({ values }) => (
            <Form>
              <Heading use="h5">Enter player names</Heading>
              <FieldArray name="playerNames">
                {(arrayHelper) => (
                  <Stack spacing="major-3">
                    <FormInputs names={values.playerNames} />
                    <PlusMinusButtonGroup arrayHelper={arrayHelper} arrayLen={values.playerNames.length} />
                    <Button type="submit" palette="primary">
                      Create Game!
                    </Button>
                  </Stack>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </PageContent>
    </Box>
  );
};

interface FieldWithErrorProps {
  name: string;
  placeholder: string;
}
const FieldWithError: React.FunctionComponent<FieldWithErrorProps> = ({ name, placeholder }) => (
  <Box marginBottom="major-3" position="relative">
    <Field name={name} component={InputField.Formik} placeholder={placeholder} />
    <Box position="absolute">
      <Field name={name}>
        {(props: FieldProps) => {
          const error = getIn(props.form.errors, name);
          const touch = getIn(props.form.touched, name);
          return <Text color="danger">{touch && error ? error : ''}</Text>;
        }}
      </Field>
    </Box>
  </Box>
);

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

export default Home;
