import React, { useState, useRef, useEffect } from 'react';
import { Star, Sparkles, Trophy, RotateCcw } from 'lucide-react';

const SpaceWordSearch = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [shake, setShake] = useState(false);

  const themes = {
    sun: {
      title: '☀️ The Sun',
      words: ['SUN', 'LIGHT', 'HEAT', 'RAY', 'ENERGY', 'FLARE'],
      grid: [
        ['S', 'U', 'N', 'R', 'X', 'M', 'P', 'Q', 'T', 'Y'],
        ['A', 'B', 'L', 'I', 'G', 'H', 'T', 'R', 'U', 'V'],
        ['E', 'N', 'E', 'R', 'G', 'Y', 'A', 'S', 'W', 'X'],
        ['H', 'E', 'A', 'T', 'K', 'L', 'M', 'N', 'O', 'P'],
        ['P', 'Q', 'W', 'R', 'A', 'Y', 'B', 'C', 'D', 'E'],
        ['F', 'L', 'A', 'R', 'E', 'X', 'Y', 'Z', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']
      ]
    },
    aurora: {
      title: '🌈 Northern Lights',
      words: ['AURORA', 'LIGHT', 'SKY', 'GREEN', 'GLOW', 'POLAR'],
      grid: [
        ['A', 'U', 'R', 'O', 'R', 'A', 'X', 'Y', 'Z', 'A'],
        ['P', 'O', 'L', 'A', 'R', 'M', 'N', 'P', 'Q', 'R'],
        ['G', 'R', 'E', 'E', 'N', 'S', 'T', 'U', 'V', 'W'],
        ['S', 'K', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['L', 'I', 'G', 'H', 'T', 'U', 'V', 'W', 'X', 'Y'],
        ['G', 'L', 'O', 'W', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
        ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']
      ]
    },
    storm: {
      title: '⚡ Solar Storm',
      words: ['STORM', 'WIND', 'PLASMA', 'FIELD', 'SOLAR'],
      grid: [
        ['S', 'T', 'O', 'R', 'M', 'X', 'Y', 'Z', 'A', 'B'],
        ['W', 'I', 'N', 'D', 'M', 'A', 'C', 'D', 'E', 'F'],
        ['P', 'L', 'A', 'S', 'M', 'A', 'G', 'H', 'I', 'J'],
        ['F', 'I', 'E', 'L', 'D', 'K', 'L', 'M', 'N', 'O'],
        ['S', 'O', 'L', 'A', 'R', 'Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
        ['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']
      ]
    },
    satellite: {
      title: '🛰️ Satellites',
      words: ['SATELLITE', 'ORBIT', 'SIGNAL', 'GPS', 'SPACE'],
      grid: [
        ['S', 'A', 'T', 'E', 'L', 'L', 'I', 'T', 'E', 'X'],
        ['O', 'R', 'B', 'I', 'T', 'M', 'N', 'P', 'Q', 'R'],
        ['S', 'I', 'G', 'N', 'A', 'L', 'S', 'T', 'U', 'V'],
        ['G', 'P', 'S', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C'],
        ['S', 'P', 'A', 'C', 'E', 'I', 'J', 'K', 'L', 'M'],
        ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'],
        ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']
      ]
    },
    magnetic: {
      title: '🧲 Magnetic Field',
      words: ['MAGNET', 'POLE', 'EARTH', 'SHIELD', 'CORE'],
      grid: [
        ['M', 'A', 'G', 'N', 'E', 'T', 'X', 'Y', 'Z', 'A'],
        ['P', 'O', 'L', 'E', 'R', 'S', 'T', 'U', 'V', 'W'],
        ['E', 'A', 'R', 'T', 'H', 'V', 'W', 'X', 'Y', 'Z'],
        ['S', 'H', 'I', 'E', 'L', 'D', 'A', 'B', 'C', 'D'],
        ['C', 'O', 'R', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
        ['L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
      ]
    }
  };

  const resetGame = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setScore(0);
    setShowCelebration(false);
    setConfetti([]);
    setShake(false);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    resetGame();
  };

  const getCellKey = (row, col) => `${row}-${col}`;

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      const cellKey = getCellKey(row, col);
      const alreadySelected = selectedCells.some(
        cell => getCellKey(cell.row, cell.col) === cellKey
      );
      if (!alreadySelected) {
        setSelectedCells([...selectedCells, { row, col }]);
      }
    }
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = audioContext.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  };

  const playErrorSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
        color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      checkWord();
      setIsDragging(false);
    }
  };

  const checkWord = () => {
    if (!selectedTheme || selectedCells.length === 0) return;

    const theme = themes[selectedTheme];
    const selectedWord = selectedCells
      .map(cell => theme.grid[cell.row][cell.col])
      .join('');

    const reversedWord = selectedWord.split('').reverse().join('');

    const matchedWord = theme.words.find(
      word => word === selectedWord || word === reversedWord
    );

    if (matchedWord && !foundWords.includes(matchedWord)) {
      setFoundWords([...foundWords, matchedWord]);
      setScore(score + matchedWord.length * 10);
      setShowCelebration(true);
      createConfetti();
      playSuccessSound();
      setTimeout(() => setShowCelebration(false), 1000);
    } else if (selectedCells.length >= 3) {
      setShake(true);
      playErrorSound();
      setTimeout(() => setShake(false), 500);
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some(
      cell => cell.row === row && cell.col === col
    );
  };

  const isWordFound = (row, col) => {
    if (!selectedTheme) return false;
    const theme = themes[selectedTheme];
    const letter = theme.grid[row][col];
    
    return foundWords.some(word => {
      for (let r = 0; r < theme.grid.length; r++) {
        for (let c = 0; c < theme.grid[r].length; c++) {
          const positions = [];
          for (let i = 0; i < word.length; i++) {
            if (c + i < theme.grid[r].length) positions.push({ r, c: c + i });
            if (r + i < theme.grid.length) positions.push({ r: r + i, c });
          }
          if (positions.some(p => p.r === row && p.c === col)) {
            const horizontal = positions.filter(p => p.r === r).map(p => theme.grid[p.r][p.c]).join('');
            const vertical = positions.filter(p => p.c === c).map(p => theme.grid[p.r][p.c]).join('');
            if (horizontal === word || vertical === word) return true;
          }
        }
      }
      return false;
    });
  };

  if (!selectedTheme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Star className="text-yellow-300 animate-pulse" size={48} />
              Space Weather Word Search
              <Star className="text-yellow-300 animate-pulse" size={48} />
            </h1>
            <p className="text-xl text-purple-200">Choose a space weather theme and find all the words!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeSelect(key)}
                className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-yellow-300"
              >
                <h3 className="text-3xl font-bold mb-4">{theme.title}</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-lg font-semibold mb-2">Words to Find:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {theme.words.map((word, idx) => (
                      <span key={idx} className="bg-yellow-300 text-purple-900 px-3 py-1 rounded-full font-bold text-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentTheme = themes[selectedTheme];
  const allWordsFound = foundWords.length === currentTheme.words.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSelectedTheme(null)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-xl font-bold text-xl shadow-lg flex items-center gap-2">
              <Trophy size={24} />
              {score} points
            </div>
            <button
              onClick={resetGame}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-2">{currentTheme.title}</h2>
          <p className="text-xl text-purple-200">Drag your mouse over the letters to form words!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div 
              className={`bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-4 border-yellow-300 ${shake ? 'animate-shake' : ''}`}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="inline-block">
                {currentTheme.grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1 mb-1">
                    {row.map((letter, colIndex) => (
                      <div
                        key={colIndex}
                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl font-bold rounded-lg cursor-pointer select-none transition-all duration-200 transform hover:scale-110 ${
                          isCellSelected(rowIndex, colIndex)
                            ? 'bg-yellow-400 text-purple-900 scale-110 shadow-lg'
                            : isWordFound(rowIndex, colIndex)
                            ? 'bg-green-400 text-white'
                            : 'bg-purple-600 text-white hover:bg-purple-500'
                        }`}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-4 border-pink-400">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-yellow-300" />
                Words
              </h3>
              <div className="space-y-3">
                {currentTheme.words.map((word, idx) => (
                  <div
                    key={idx}
                    className={`px-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                      foundWords.includes(word)
                        ? 'bg-green-400 text-white line-through transform scale-105'
                        : 'bg-purple-600 text-white'
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="text-8xl animate-bounce">
              🌟 ⭐ ✨
            </div>
          </div>
        )}

        {confetti.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
              <div
                key={piece.id}
                className="absolute w-3 h-3 animate-fall"
                style={{
                  left: `${piece.left}%`,
                  backgroundColor: piece.color,
                  animationDuration: `${piece.animationDuration}s`,
                  animationDelay: `${piece.delay}s`,
                  top: '-10px'
                }}
              />
            ))}
          </div>
        )}

        {allWordsFound && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 text-center shadow-2xl transform scale-110 border-8 border-white">
              <div className="text-6xl mb-4">🎉 🏆 🎊</div>
              <h2 className="text-5xl font-bold text-white mb-4">Congratulations!</h2>
              <p className="text-2xl text-white mb-6">You found all the words!</p>
              <p className="text-3xl font-bold text-purple-900 mb-6">Final Score: {score}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg transform hover:scale-105 transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setSelectedTheme(null)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg transform hover:scale-105 transition-all"
                >
                  Choose Another Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceWordSearch;

// CSS Styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  .animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
  
  .animate-fall {
    animation: fall linear forwards;
  }
`;
document.head.appendChild(style);