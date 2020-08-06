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
import { Formik, Form, Field, FieldArray, FieldArrayRenderProps } from 'formik';

const minPlayers = 3;
const maxPlayers = 10;
interface FormData {
  playerNames: string[];
}

const Home: React.FunctionComponent = () => {
  const initialValues: FormData = {
    playerNames: Array(4).fill(''),
  };
  return (
    <Box>
      <PageContent>
        <Heading fontSize='2.5rem'>Oh Hell Scorecard</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={values => console.log(values)}
        >
          {formik => (
            <Form>
              <Heading use='h5'>Enter player names</Heading>
              <FieldArray name='playerNames'>
                {arrayHelper => (
                  <Stack spacing='major-1'>
                    <FormInputs names={formik.values.playerNames} />
                    <PlusMinusButtonGroup
                      arrayHelper={arrayHelper}
                      arrayLen={formik.values.playerNames.length}
                    />
                    <Button type='submit' palette='primary'>
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

interface PlusMinusButtonGroupProps {
  arrayHelper: FieldArrayRenderProps;
  arrayLen: number;
}
const PlusMinusButtonGroup: React.FunctionComponent<PlusMinusButtonGroupProps> = ({
  arrayHelper,
  arrayLen,
}) => {
  const increment = (_: React.MouseEvent) => {
    if (arrayLen < maxPlayers) {
      arrayHelper.push('');
    }
  };
  const decrement = (_: React.MouseEvent) => {
    if (arrayLen > minPlayers) {
      arrayHelper.remove(arrayLen - 1);
    }
  };
  return (
    <Group>
      <Button onClick={increment}>
        <Icon icon='solid-plus' />
      </Button>
      <Button onClick={decrement}>
        <Icon icon='solid-minus' />
      </Button>
    </Group>
  );
};

interface FormInputsProps {
  names: string[];
}
const FormInputs: React.FunctionComponent<FormInputsProps> = ({ names }) => (
  <React.Fragment>
    {names.map((_, i) => (
      <Field
        key={i}
        name={`playerNames[${i}]`}
        component={InputField.Formik}
        placeholder={`Player ${i + 1}`}
      />
    ))}
  </React.Fragment>
);

export default Home;
