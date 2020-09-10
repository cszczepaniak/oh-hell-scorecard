import { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { INewGameRequest } from '../newGame/types';
import { IGame, IGameStats, emptyGame } from './types';

const gameStorageKey = 'SavedGame';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });
  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};

export const useCreateGame = (): ((req: INewGameRequest) => void) => {
  const [, setGame] = useLocalStorage<IGame | null>(gameStorageKey, null);
  return (req: INewGameRequest) => {
    const stats: { [name: string]: IGameStats } = {};
    req.playerNames.forEach(n => {
      stats[n] = {
        bidsPerRound: 0,
        currentBid: -1,
        hitPercentage: 0,
        pointsBack: 0,
        pointsPerRound: 0,
        score: 0,
        totalBids: 0,
        tricksPerRound: 0,
      };
    });
    const game: IGame = {
      currentRound: 1,
      ...req,
      playerStats: stats,
    };
    setGame(game);
  };
};

export const useSavedGame = (): {
  game: IGame;
  saveGame: (game: IGame) => void;
  deleteGame: () => void;
} => {
  const history = useHistory();
  const [game, setGame] = useLocalStorage<IGame>(gameStorageKey, emptyGame);
  useEffect(() => {
    if (game === emptyGame) {
      history.push('/');
    }
  }, [history, game]);
  return {
    game: game ? (game as IGame) : emptyGame,
    saveGame: setGame,
    deleteGame: () => {
      setGame(emptyGame);
    },
  };
};
