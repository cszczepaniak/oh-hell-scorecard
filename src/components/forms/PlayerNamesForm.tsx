import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, IconButton, Switch, TextField, Typography } from '@material-ui/core';
import { Clear, Forward } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { useDealer, usePlayerNames } from '../../hooks/game-hooks';

interface PlayerNamesFormProps {
    minPlayers: number;
    maxPlayers: number;
}

const playerNamesError = 'Player names must be unique and non-empty';
const dealerError = 'Please select a dealer';

export const PlayerNamesForm: React.FunctionComponent<PlayerNamesFormProps> = ({ minPlayers, maxPlayers }) => {
    const {
        playerNames,
        dealer,
        validation,
        setName,
        setDealer,
        unsetDealer,
        addPlayer,
        removePlayer,
        handlePlayerNameBlur,
    } = usePlayerFormData(minPlayers, maxPlayers);
    const [errorText, setErrorText] = useState('');

    const history = useHistory();

    const handleOnDealerChange = (playerName: string) => {
        if (playerName.length === 0) {
            return;
        }
        if (dealer.length > 0 && dealer === playerName) {
            console.log(`unsetting dealer ${playerName}`);
            unsetDealer();
            return;
        }
        setDealer(playerName);
    };

    const handleGoToGameSettings = () => {
        if (playerNames.some(n => n.length === 0) || hasDuplicates(playerNames)) {
            setErrorText(playerNamesError);
            return;
        }
        if (dealer.length === 0) {
            setErrorText(dealerError);
            return;
        }
        history.push('/gameSettings');
    };

    // clear error text if the errors have been fixed
    useEffect(() => {
        if (errorText === playerNamesError && !playerNames.some(n => n.length === 0) && !hasDuplicates(playerNames)) {
            setErrorText('');
        }
        if (errorText === dealerError && dealer.length > 0) {
            setErrorText('');
        }
    }, [playerNames, dealer]);

    return (
        <Grid container spacing={3} alignItems='center'>
            <Grid item xs={8}>
                <Typography variant='h5'>Enter player names</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Dealer?</Typography>
            </Grid>
            {playerNames.map((p, i) => (
                <>
                    <Grid item xs={8}>
                        <TextField
                            value={p}
                            variant='outlined'
                            fullWidth
                            placeholder={`Player ${i + 1}`}
                            error={validation[i].length > 0}
                            helperText={validation[i]}
                            onChange={e => setName(i, e.target.value)}
                            onBlur={() => handlePlayerNameBlur(i)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Switch
                            color='primary'
                            onChange={() => handleOnDealerChange(p)}
                            checked={p.length > 0 && dealer === p}
                            disabled={p.length === 0}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton disabled={playerNames.length <= minPlayers} onClick={() => removePlayer(i)}>
                            <Clear />
                        </IconButton>
                    </Grid>
                </>
            ))}
            <Grid item xs={4}>
                <Button
                    fullWidth
                    variant='contained'
                    disabled={playerNames.length === maxPlayers}
                    onClick={() => addPlayer('')}
                >
                    Add Player
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button fullWidth color='primary' variant='contained' onClick={handleGoToGameSettings}>
                    <div>Game Settings</div>
                    <Forward style={{ marginLeft: 'auto' }} />
                </Button>
            </Grid>
            {errorText.length > 0 && (
                <Grid item xs={8}>
                    <Typography color='error'>
                        <Box fontStyle='italic'>{errorText}</Box>
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

// custom hook for handling the form data
const usePlayerFormData = (minPlayers: number, maxPlayers: number) => {
    const { playerNames, setPlayerNames } = usePlayerNames();
    const { dealer, setDealer, unsetDealer } = useDealer();
    const [touched, setTouched] = useState(Array(playerNames.length).fill(false));
    const [validation, setValidation] = useState<string[]>(Array(playerNames.length).fill(''));

    // validation for each name
    useEffect(() => {
        setValidation(
            playerNames.map((p, i) => {
                if (touched[i] && p.length === 0) {
                    return 'Name is required';
                }
                return '';
            }),
        );
    }, [playerNames, touched]);

    return {
        playerNames,
        dealer,
        validation,
        setName: (idx: number, playerName: string) => {
            const playersCopy = [...playerNames];
            playersCopy[idx] = playerName;
            setPlayerNames(playersCopy);
        },
        setDealer: (playerName: string) => {
            if (!playerNames.includes(playerName)) {
                setDealer('');
            }
            setDealer(playerName);
        },
        unsetDealer,
        addPlayer: (playerName: string) => {
            if (playerNames.length < maxPlayers) {
                setPlayerNames([...playerNames, playerName]);
                setTouched([...touched, false]);
                setValidation([...validation, '']);
            }
        },
        removePlayer: (idx: number) => {
            if (dealer === playerNames[idx]) {
                unsetDealer();
            }
            if (playerNames.length > minPlayers) {
                setPlayerNames(playerNames.filter((_, i) => i !== idx));
                setTouched(touched.filter((_, i) => i !== idx));
                setValidation(validation.filter((_, i) => i !== idx));
            }
        },
        handlePlayerNameBlur: (idx: number) => {
            const touchedCopy = [...touched];
            touchedCopy[idx] = true;
            setTouched(touchedCopy);
        },
    };
};

const hasDuplicates = (playerNames: string[]): boolean => {
    const nameMap: { [key: string]: string } = {};
    for (let i = 0; i < playerNames.length; i++) {
        if (playerNames[i] in nameMap) {
            return true;
        }
        nameMap[playerNames[i]] = '';
    }
    return false;
};
