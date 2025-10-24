import React from 'react';
import { Player } from '../types';
import Button from './Button';

interface ResultScreenProps {
  winner: Player | null;
  onGoToMenu: () => void;
  onPlayAgain: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ winner, onGoToMenu, onPlayAgain }) => {
  let winnerText = 'เสมอ!';
  if (winner) {
    if (winner === 'player1') {
      winnerText = 'ผู้เล่น 1 ชนะ!';
    } else {
      winnerText = 'ผู้เล่น 2 ชนะ!';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-pop-in">
        <div className="mb-8">
            <span className="text-9xl">🎉</span>
        </div>
      <h1 className="text-6xl font-bold mb-4">จบเกม!</h1>
      <h2 className="text-4xl text-yellow-300 mb-12">{winnerText}</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onPlayAgain}>เล่นอีกครั้ง</Button>
        <button 
            onClick={onGoToMenu}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-10 text-2xl rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
            กลับเมนูหลัก
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;