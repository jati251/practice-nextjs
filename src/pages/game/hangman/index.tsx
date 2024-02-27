import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Hangman: React.FC = () => {
  const [word, setWord] = useState<string>('hello');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const router = useRouter();

  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      if (!word.includes(letter)) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  const maskedWord = word.replace(
    new RegExp(`[^${guessedLetters.join('')}]`, 'g'),
    '_'
  );

  const isGameOver = incorrectGuesses >= 6 || maskedWord === word;

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Hangman</h1>
        <div className="text-4xl text-center mb-6 text-gray-800">{maskedWord}</div>
        {!isGameOver && (
          <div className="flex flex-wrap justify-center mb-6">
            {Array.from({ length: 26 }, (_, index) => {
              const letter = String.fromCharCode('A'.charCodeAt(0) + index);
              return (
                <button
                  key={index}
                  className="bg-pink-500 text-white py-2 px-4 rounded-md mr-2 mb-2 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  onClick={() => handleGuess(letter)}
                  disabled={guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}
        {isGameOver && (
          <div className="text-xl font-semibold text-center text-gray-800 mb-4">
            {maskedWord === word ? 'Congratulations, you win!' : 'Sorry, you lose!'}
          </div>
        )}
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Hangman;
