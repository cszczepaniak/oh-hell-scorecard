import React from 'react';

import { useHistory } from 'react-router';

import { Button } from '../../shared/ui-components/Button';

export const Home: React.FunctionComponent = () => {
    const history = useHistory();
    return (
        <div className='mx-auto py-8 text-center'>
            <h1 className='text-3xl sm:text-5xl'>Oh Heck Scorecard</h1>
            <Button onClick={() => history.push('/newGame')} className='mt-16 px-8 text-lg sm:text-xl'>
                Start a Game
            </Button>
        </div>
    );
};
