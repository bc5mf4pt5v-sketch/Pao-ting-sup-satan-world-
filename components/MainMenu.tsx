import React from 'react';
import Button from './Button';

interface MainMenuProps {
  onStartGame: () => void;
}

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 text-yellow-300 ${className}`}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative animate-pop-in">
       <Star className="absolute top-10 left-10 transform rotate-12" />
       <Star className="absolute top-20 right-16 transform -rotate-12 w-12 h-12 text-pink-400" />
       <Star className="absolute bottom-1/4 left-1/4 w-6 h-6 text-teal-300" />

      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4" style={{textShadow: '3px 3px 0px rgba(0,0,0,0.2)'}}>
        เกม เป่ายิงฉุบ
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-pink-300 mb-12" style={{textShadow: '2px 2px 0px rgba(0,0,0,0.2)'}}>
        สะท้านโลก
      </h2>
      <div className="space-y-6">
        <Button onClick={() => onStartGame()}>
          เริ่มเกม
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;