import React, { useEffect, useState } from 'react';

// import { NewGameConfigContext } from './context';
// import { actions } from './slice';
import { Button, Grid, IconButton, Switch, TextField, Typography } from '@material-ui/core';
import { Clear, Forward } from '@material-ui/icons';

interface PlayerNamesFormProps {
  minPlayers: number;
  maxPlayers: number;
}

interface Player {
  name: string;
  isDealer: boolean;
}

const initialPlayers: Player[] = new Array(4).fill({
  name: '',
  isDealer: false,
});

export const PlayerNamesForm: React.FunctionComponent<PlayerNamesFormProps> = ({ minPlayers, maxPlayers }) => {
  // const { state, dispatch } = useContext(NewGameConfigContext);
  const {
    players,
    validation,
    setName,
    toggleIsDealer,
    addPlayer,
    removePlayer,
    handlePlayerNameBlur,
  } = usePlayerFormData(minPlayers, maxPlayers);

  return (
    <Grid container spacing={3} alignItems='center'>
      <Grid item xs={8}>
        <Typography variant='h5'>Enter player names</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Dealer?</Typography>
      </Grid>
      {players.map((p, i) => (
        <>
          <Grid item xs={8}>
            <TextField
              value={p.name}
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
            <Switch color='primary' onChange={() => toggleIsDealer(i)} checked={p.isDealer} />
          </Grid>
          <Grid item xs={2}>
            <IconButton disabled={players.length <= minPlayers} onClick={() => removePlayer(i)}>
              <Clear />
            </IconButton>
          </Grid>
        </>
      ))}
      <Grid item xs={4}>
        <Button fullWidth variant='contained' disabled={players.length === maxPlayers} onClick={addPlayer}>
          Add Player
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button fullWidth color='primary' variant='contained'>
          <div>Game Settings</div>
          <Forward style={{ marginLeft: 'auto' }} />
        </Button>
      </Grid>
    </Grid>
  );
};

// custom hook for handling the form data
const usePlayerFormData = (minPlayers: number, maxPlayers: number) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [touched, setTouched] = useState(Array(initialPlayers.length).fill(false));
  const [validation, setValidation] = useState<string[]>(Array(initialPlayers.length).fill(''));

  // form validation
  useEffect(() => {
    setValidation(
      players.map((p, i) => {
        if (touched[i] && p.name.length === 0) {
          return 'Name is required';
        }
        return '';
      }),
    );
  }, [players, touched]);

  return {
    players,
    validation,
    setName: (idx: number, name: string) => {
      // set the name
      const newPlayers = [...players];
      newPlayers[idx] = { ...newPlayers[idx], name };
      setPlayers(newPlayers);
    },
    toggleIsDealer: (idx: number) => {
      if (!players[idx].isDealer) {
        setPlayers(players.map((p, i) => ({ ...p, isDealer: i === idx })));
        return;
      }
      const newPlayers = [...players];
      newPlayers[idx].isDealer = false;
      setPlayers(newPlayers);
    },
    addPlayer: () => {
      if (players.length < maxPlayers) {
        setPlayers([...players, { name: '', isDealer: false }]);
        setTouched([...touched, false]);
        setValidation([...validation, '']);
      }
    },
    removePlayer: (idx: number) => {
      if (players.length > minPlayers) {
        setPlayers(players.filter((_, i) => i !== idx));
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
