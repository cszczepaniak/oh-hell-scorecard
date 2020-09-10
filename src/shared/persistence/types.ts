import { INewGameRequest, IGameSettings, defaultRequest } from '../newGame/types';

export interface IGame extends INewGameRequest {
  dealer: string;
  playerNames: string[];
  currentRound: number;
  settings: IGameSettings;
  playerStats: { [name: string]: IGameStats };
}

export const emptyGame: IGame = {
  dealer: '',
  playerNames: [],
  currentRound: 0,
  settings: defaultRequest.settings,
  playerStats: {},
};

export interface IGameStats {
  score: number;
  currentBid: number;
  pointsPerRound: number;
  bidsPerRound: number;
  tricksPerRound: number;
  totalBids: number;
  hitPercentage: number;
  pointsBack: number;
}
