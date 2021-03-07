import React from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Home: React.FunctionComponent = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>Oh Hell Scorecard</Typography>
            </Grid>
            <Grid item xs={6}>
                <Button component={Link} to='/newGame' variant='contained' color='primary'>
                    Start a Game
                </Button>
            </Grid>
        </Grid>
    );
};
