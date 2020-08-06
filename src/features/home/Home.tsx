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

const Home = () => {
  const increment = (arrayHelper: FieldArrayRenderProps, arrayLen: number) => (
    _: React.MouseEvent
  ) => {
    if (arrayLen < maxPlayers) {
      arrayHelper.push('');
    }
  };
  const decrement = (arrayHelper: FieldArrayRenderProps, arrayLen: number) => (
    _: React.MouseEvent
  ) => {
    if (arrayLen > minPlayers) {
      arrayHelper.remove(arrayLen - 1);
    }
  };
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
                    {formik.values.playerNames.map((_, i) => (
                      <Field
                        key={i}
                        name={`playerNames[${i}]`}
                        component={InputField.Formik}
                        placeholder={`Player ${i + 1}`}
                      />
                    ))}
                    <Group>
                      <Button
                        onClick={increment(
                          arrayHelper,
                          formik.values.playerNames.length
                        )}
                      >
                        <Icon icon='solid-plus' />
                      </Button>
                      <Button
                        onClick={decrement(
                          arrayHelper,
                          formik.values.playerNames.length
                        )}
                      >
                        <Icon icon='solid-minus' />
                      </Button>
                    </Group>
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

Home.propTypes = {};

export default Home;
