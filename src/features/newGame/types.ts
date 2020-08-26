export enum ScoringMode {
  Standard,
  Negative,
}

export interface IGameSettings {
  scoringMode: ScoringMode;
  bonusRounds: boolean;
}

export interface INewGameState {
  playerNames: string[];
  dealer: string;
  settings: IGameSettings;
}
