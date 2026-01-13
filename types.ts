
export interface QuizQuestion {
  word: string;
  translation: string;
  distractors: string[];
  options: string[]; // Shuffled version of translation + distractors
}

export enum AppStep {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT'
}
