import React, { useState, useEffect, useCallback } from 'react';
import { Choice, RoundResult, Player } from '../types';
import { CHOICES, CHOICE_EMOJI_MAP, MAX_ROUNDS, WINNING_SCORE } from '../constants';
import Button from './Button';

interface GameScreenProps {
  scores: { player1: number; player2: number };
  onRoundEnd: (winner: RoundResult) => void;
  onGoToMenu: () => void;
  round: number;
}

const Hand: React.FC<{ choice: Choice | null, isFlipped?: boolean }> = ({ choice, isFlipped }) => {
    const content = choice ? CHOICE_EMOJI_MAP[choice] : '✊';
    const classes = `text-8xl md:text-9xl transition-transform duration-300 ${isFlipped ? 'flipped' : ''}`;
    return <div className={classes}>{content}</div>
};


const GameScreen: React.FC<GameScreenProps> = ({ scores, onRoundEnd, onGoToMenu, round }) => {
  const [player1Choice, setPlayer1Choice] = useState<Choice | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<Choice | null>(null);
  const [roundResult, setRoundResult] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pvpTurn, setPvpTurn] = useState<Player>('player1');
  const [pvpPrompt, setPvpPrompt] = useState('');

  const opponentName = 'ผู้เล่น 2';
  const showChoices = !!(player1Choice && player2Choice);

  const determineWinner = useCallback((p1: Choice, p2: Choice): RoundResult => {
    if (p1 === p2) return 'draw';
    if (
      (p1 === 'rock' && p2 === 'scissors') ||
      (p1 === 'paper' && p2 === 'rock') ||
      (p1 === 'scissors' && p2 === 'paper')
    ) {
      return 'player1';
    }
    return 'player2';
  }, []);

  const resetRound = useCallback(() => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setRoundResult(null);
    setIsAnimating(false);
    setPvpTurn('player1');
    setPvpPrompt('ตาผู้เล่น 1');
  }, []);

  const handlePlayerChoice = useCallback((choice: Choice) => {
    if (isAnimating || roundResult) return;

    if (pvpTurn === 'player1') {
      setPlayer1Choice(choice);
      setPvpTurn('player2');
      setPvpPrompt('ตาผู้เล่น 2');
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setPlayer2Choice(choice);
      }, 900); // Corresponds to 3 shakes (0.3s * 3)
    }
  }, [isAnimating, roundResult, pvpTurn]);
  
  useEffect(() => {
    if (player1Choice && player2Choice) {
      const winner = determineWinner(player1Choice, player2Choice);
      onRoundEnd(winner);
      
      let resultText = '';
      if (winner === 'draw') {
        resultText = 'เสมอ!';
      } else if (winner === 'player1') {
        resultText = 'ผู้เล่น 1 ชนะรอบนี้!';
      } else {
        resultText = `${opponentName} ชนะรอบนี้!`;
      }
      setRoundResult(resultText);
    }
  }, [player1Choice, player2Choice, determineWinner, onRoundEnd, opponentName]);
  
  useEffect(() => {
    setPvpPrompt('ตาผู้เล่น 1');
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-between h-full w-full py-8">
       <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={onGoToMenu}
          className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          &larr; กลับเมนูหลัก
        </button>
      </div>
      
      {/* Scores */}
       <div className="text-center mb-4">
        <p className="text-3xl font-bold">รอบที่ {round}</p>
        <p className="text-xl text-pink-200">ใครชนะ {WINNING_SCORE} ใน {MAX_ROUNDS} เกมก่อน ชนะ!</p>
      </div>
      <div className="flex justify-between w-full max-w-2xl text-2xl font-bold px-4">
        <div className="text-center">
          <p>ผู้เล่น 1</p>
          <p className="text-4xl">{scores.player1}</p>
        </div>
        <div className="text-center">
          <p>{opponentName}</p>
          <p className="text-4xl">{scores.player2}</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="text-center mb-4 h-24 flex flex-col justify-center">
            {roundResult ? (
                <h2 className="text-5xl font-bold animate-pop-in">{roundResult}</h2>
            ) : (
                <>
                    <h2 className="text-4xl font-bold">{pvpPrompt}</h2>
                    {pvpTurn === 'player2' && (
                        <p className="text-xl mt-2">ผู้เล่น 1 เลือกแล้ว! ส่งต่อให้ผู้เล่น 2</p>
                    )}
                </>
            )}
        </div>
        <div className="flex justify-around items-center w-full max-w-xl">
           <div className={`transform ${isAnimating ? 'animate-shake' : ''}`}>
               <Hand choice={showChoices ? player1Choice : null} />
           </div>
           <div className="text-4xl font-bold text-pink-300">VS</div>
           <div className={`transform ${isAnimating ? 'animate-shake' : ''}`}>
               <Hand choice={showChoices ? player2Choice : null} isFlipped />
           </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="w-full h-28 flex items-center justify-center">
        {roundResult ? (
          <div className="animate-pop-in">
            <Button onClick={resetRound}>
                รอบต่อไป
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8">
            {CHOICES.map((choice) => (
              <button
                key={choice}
                onClick={() => handlePlayerChoice(choice)}
                disabled={isAnimating}
                className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold p-4 rounded-2xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                <span className="text-5xl">{CHOICE_EMOJI_MAP[choice]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
