import React, { useState } from 'react';

import { Button, Checkbox, Dialog, Grid, IconButton, MenuItem, Select, Typography } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import { useHistory } from 'react-router';

import { ScoringMode } from '../../game/game';
import { useGame } from '../../game/game-hooks';
import { useGameSettings } from '../hooks';

export const SettingsForm: React.FunctionComponent = () => {
    const { bonusRounds, setBonusRounds, scoringMode, setScoringMode } = useGameSettings();
    const { initializePlayers } = useGame();
    const history = useHistory();
    const [bonusRoundModalOpen, setBonusRoundModalOpen] = useState(false);
    const [scoringModeModalOpen, setScoringModeModalOpen] = useState(false);

    const handleScoringModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setScoringMode(event.target.value as ScoringMode);
    };

    const handleClick = () => {
        initializePlayers();
        history.push('/game');
    };

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <Typography>Bonus Rounds</Typography>
                <Dialog open={bonusRoundModalOpen} onClose={() => setBonusRoundModalOpen(false)}>
                    Rounds with the most cards for the given number of players are bonus rounds. In a bonus round,
                    players are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.
                </Dialog>
                <Grid container direction='row'>
                    <Checkbox color='primary' checked={bonusRounds} onChange={() => setBonusRounds(!bonusRounds)} />
                    <IconButton onClick={() => setBonusRoundModalOpen(true)}>
                        <Help />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item>
                <Typography>Scoring Mode</Typography>
                <Dialog open={scoringModeModalOpen} onClose={() => setScoringModeModalOpen(false)}>
                    <Typography>Standard:</Typography>
                    Players are awarded one point for each trick they take, plus a bonus of 10 points for hitting their
                    bid.
                    <Typography>Negative:</Typography>
                    Players are awarded 10 plus one point for each trick they take if they hit their bid, otherwise they
                    receive negative points equal to the difference between bid and actual tricks taken.
                </Dialog>
                <Grid container direction='row'>
                    <Select onChange={handleScoringModeChange} variant='outlined' value={scoringMode}>
                        <MenuItem value={'Standard'}>Standard</MenuItem>
                        <MenuItem value={'Negative'}>Negative</MenuItem>
                    </Select>
                    <IconButton onClick={() => setScoringModeModalOpen(true)}>
                        <Help />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={handleClick}>
                    Start Game
                </Button>
            </Grid>
        </Grid>
    );
};
