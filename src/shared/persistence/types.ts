export enum ScoringMode {
  Standard,
  Negative,
}

export interface IGameSettings {
  scoringMode: ScoringMode;
  bonusRounds: boolean;
}

export interface INewGameRequest {
  playerNames: string[];
  dealer: string;
  settings: IGameSettings;
}

export const defaultRequest: INewGameRequest = {
  playerNames: [],
  dealer: '',
  settings: {
    bonusRounds: true,
    scoringMode: ScoringMode.Negative,
  },
};

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
