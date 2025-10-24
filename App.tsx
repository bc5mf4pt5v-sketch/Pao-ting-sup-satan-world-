import React, { useState, useCallback } from 'react';
import { GameState, Player, RoundResult } from './types';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { WINNING_SCORE, MAX_ROUNDS } from './constants';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [round, setRound] = useState(1);
  const [winner, setWinner] = useState<Player | null>(null);

  const handleStartGame = useCallback(() => {
    setGameState('playing');
    setScores({ player1: 0, player2: 0 });
    setRound(1);
    setWinner(null);
  }, []);

  const handleRoundEnd = useCallback((roundWinner: RoundResult) => {
    const newScores = { ...scores };
    if (roundWinner && roundWinner !== 'draw') {
      newScores[roundWinner]++;
    }

    if (newScores.player1 === WINNING_SCORE) {
      setWinner('player1');
      setGameState('result');
    } else if (newScores.player2 === WINNING_SCORE) {
      setWinner('player2');
      setGameState('result');
    } else if (round === MAX_ROUNDS) {
      if (newScores.player1 > newScores.player2) {
        setWinner('player1');
      } else if (newScores.player2 > newScores.player1) {
        setWinner('player2');
      } else {
        setWinner(null); // Draw
      }
      setGameState('result');
    }

    setScores(newScores);
    setRound(r => r + 1);
  }, [scores, round]);

  const handleGoToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'menu':
        return <MainMenu onStartGame={handleStartGame} />;
      case 'playing':
        return (
          <GameScreen
            scores={scores}
            onRoundEnd={handleRoundEnd}
            onGoToMenu={handleGoToMenu}
            round={round}
          />
        );
      case 'result':
        return (
          <ResultScreen
            winner={winner}
            onGoToMenu={handleGoToMenu}
            onPlayAgain={handleStartGame}
          />
        );
      default:
        return <MainMenu onStartGame={handleStartGame} />;
    }
  };

  return (
    <div 
        className="min-h-screen w-full bg-cover bg-center text-white flex flex-col items-center justify-center p-4 relative overflow-hidden" 
        style={{backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/denim.png')"}}
    >
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <main className="z-10 w-full max-w-4xl h-full flex flex-col">
            {renderGameState()}
        </main>
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] z-0">
             <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="#f8c8dc" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,154.7C960,181,1056,235,1152,240C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    </div>
  );
}

export default App;
