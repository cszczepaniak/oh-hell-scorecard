import { INewGameRequest, IGameSettings } from '../../shared/persistence/types';

export interface IGame extends INewGameRequest {
  dealer: string;
  playerNames: string[];
  currentRound: number;
  settings: IGameSettings;
  playerStats: { [name: string]: IGameStats };
}

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
