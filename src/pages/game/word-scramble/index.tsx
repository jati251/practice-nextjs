import React, { useState, useEffect } from "react";

const WordScrambleGame: React.FC = () => {
  const words: string[] = [
    "javascript",
    "react",
    "angular",
    "typescript",
    "node",
  ];
  const [scrambledWord, setScrambledWord] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    const randomIndex: number = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  }, []);

  useEffect(() => {
    if (currentWord) {
      const shuffled: string = shuffleWord(currentWord);
      setScrambledWord(shuffled);
    }
  }, [currentWord]);

  const shuffleWord = (word: string): string => {
    const shuffled: string = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return shuffled !== word ? shuffled : shuffleWord(word);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value.toLowerCase());
    setIsCorrect(false);
  };

  const handleNextWord = () => {
    const randomIndex: number = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserGuess("");
    setIsCorrect(false);
  };

  const checkGuess = () => {
    if (userGuess === currentWord) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Word Scramble Game</h1>
      <div className="mb-4">
        <p>Unscramble the word: {scrambledWord}</p>
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-3 py-1 mt-2"
          placeholder="Your guess"
          disabled={isCorrect}
        />
      </div>
      {isCorrect && (
        <div className="text-green-600 font-bold">
          Congratulations! You unscrambled the word!
        </div>
      )}
      <button
        onClick={checkGuess}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Check Guess
      </button>
      <button
        onClick={handleNextWord}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Next Word
      </button>
    </div>
  );
};

export default WordScrambleGame;
