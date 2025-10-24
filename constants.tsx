
import { Choice } from './types';

export const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];

export const CHOICE_EMOJI_MAP: Record<Choice, string> = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️',
};

export const CHOICE_NAME_MAP: Record<Choice, string> = {
    rock: 'ค้อน',
    paper: 'กระดาษ',
    scissors: 'กรรไกร',
};

export const WINNING_SCORE = 3;
export const MAX_ROUNDS = 5;
