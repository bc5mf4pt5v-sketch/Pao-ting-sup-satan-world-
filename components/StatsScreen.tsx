import React from 'react';
import { GameStats } from '../types';
import Button from './Button';

interface StatsScreenProps {
  stats: GameStats;
  onBack: () => void;
  onReset: () => void;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ stats, onBack, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-pop-in">
      <h1 className="text-6xl font-bold mb-8" style={{textShadow: '3px 3px 0px rgba(0,0,0,0.2)'}}>สถิติการเล่น</h1>
      <div className="bg-white/10 p-8 rounded-2xl shadow-lg mb-8 text-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-pink-300">แข่งกับ AI</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">ชนะ:</span>
          <span className="text-4xl text-green-400 font-bold">{stats.pveWins}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">แพ้:</span>
          <span className="text-4xl text-red-400 font-bold">{stats.pveLosses}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onBack}>กลับ</Button>
        <button 
          onClick={onReset}
          className="bg-red-500 text-white font-bold py-4 px-10 text-2xl rounded-full shadow-lg transform transition-transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          รีเซ็ตสถิติ
        </button>
      </div>
    </div>
  );
};

export default StatsScreen;
