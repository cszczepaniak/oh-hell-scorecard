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
