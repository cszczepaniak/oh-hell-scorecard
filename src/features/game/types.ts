import { INewGameRequest } from '../../shared/newGame/types';

export interface IGame extends INewGameRequest {
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
