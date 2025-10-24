export type Choice = 'rock' | 'paper' | 'scissors';
export type GameState = 'menu' | 'playing' | 'result';
export type Player = 'player1' | 'player2';
export type RoundResult = Player | 'draw' | null;

// FIX: Add the missing GameStats type.
export type GameStats = {
    pveWins: number;
    pveLosses: number;
};
