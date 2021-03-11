import React, { Fragment } from 'react';

import { Button, Card, CardContent, Grid, makeStyles, Switch, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { togglePhase } from './game';
import { useGame } from './game-hooks';

const useStyles = makeStyles(theme => ({
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    titleElement: {
        margin: theme.spacing(0, 4, 0, 0),
    },
}));

export const Game: React.FunctionComponent = () => {
    const { game } = useGame();
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <Grid container direction='column' spacing={2}>
            <Grid item className={classes.titleContainer}>
                <Typography variant='h4' className={classes.titleElement}>
                    Round number: {game.round}
                </Typography>
                <Typography variant='h4' className={classes.titleElement}>
                    Number of cards: {game.numberOfCards}
                </Typography>
            </Grid>
            {game.players.map(p => (
                <Grid item key={p.name}>
                    <Card>
                        <CardContent>
                            <Grid container direction='row'>
                                <Grid item xs={6}>
                                    <Typography variant='h5'>
                                        <span>{p.name}</span>
                                        {game.dealer === p.name && <span> (Dealing)</span>}
                                    </Typography>
                                    {game.phase === 'Bidding' && (
                                        <Fragment>
                                            <Typography variant='h6'>Bid:</Typography>
                                            <TextField variant='outlined' type='number' />
                                        </Fragment>
                                    )}
                                    {game.phase === 'Scoring' && (
                                        <Fragment>
                                            <Typography variant='h6'>Tricks Taken:</Typography>
                                            <TextField variant='outlined' type='number' />
                                        </Fragment>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6'>Score: {p.score}</Typography>
                                    {game.phase === 'Scoring' && (
                                        <Typography variant='h6'>Current Bid: {p.currentBid}</Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Grid item>
                {game.phase === 'Scoring' && (
                    <Button variant='contained' color='primary'>
                        Submit Bids
                    </Button>
                )}
                {game.phase === 'Bidding' && (
                    <Button variant='contained' color='primary'>
                        Submit Tricks
                    </Button>
                )}
                <div>temporary hack</div>
                Bidding
                <Switch checked={game.phase === 'Scoring'} onChange={() => dispatch(togglePhase())} />
                Scoring
            </Grid>
        </Grid>
    );
};
