import React, { useState } from 'react';

import { Dialog, Grid, IconButton, MenuItem, Select, Switch, Typography } from '@material-ui/core';
import { Help } from '@material-ui/icons';

import { ScoringMode } from '../../game/game';
import { useGameSettings } from '../hooks';

export const SettingsForm: React.FunctionComponent = () => {
    const { bonusRounds, setBonusRounds, scoringMode, setScoringMode } = useGameSettings();
    const [bonusRoundModalOpen, setBonusRoundModalOpen] = useState(false);
    const [scoringModeModalOpen, setScoringModeModalOpen] = useState(false);

    const handleScoringModeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setScoringMode(event.target.value as ScoringMode);
    };

    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography>Bonus Rounds</Typography>
                <Dialog open={bonusRoundModalOpen} onClose={() => setBonusRoundModalOpen(false)}>
                    Rounds with the most cards for the given number of players are bonus rounds. In a bonus round,
                    players are awarded 20 points instead of 10 if they bid 0 and take 0 tricks.
                </Dialog>
                <Grid container direction='row'>
                    <Switch color='primary' checked={bonusRounds} onChange={() => setBonusRounds(!bonusRounds)} />
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
        </Grid>
    );
};
