export enum ScoringMode {
  Standard,
  Negative,
}

export interface IGameSettings {
  scoringMode: ScoringMode;
  bonusRounds: boolean;
}

export interface INewGameState {
  displayIdx: number;
  playerNames: string[];
  dealer: string;
  settings: IGameSettings;
}
