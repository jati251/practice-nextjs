import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const HangmanGame = () => {
  const router = useRouter();

  const words = [
    "apple",
    "banana",
    "orange",
    "grape",
    "pineapple",
    "mouse",
    "cat",
    "star",
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  const [targetWord, setTargetWord] = useState<string>(words[randomIndex]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const maxAttempts = 6;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const keyPressed = event.key.toLowerCase();
      if (
        keyPressed >= "a" &&
        keyPressed <= "z" &&
        !guessedLetters.includes(keyPressed)
      ) {
        setGuessedLetters([...guessedLetters, keyPressed]);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [guessedLetters]);

  const getHiddenWord = () => {
    return targetWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  const handleReset = () => {
    const newIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[newIndex]);
    setGuessedLetters([]);
    setAttemptCount(0);
  };

  const isGameWon = () => {
    return targetWord
      .split("")
      .every((letter) => guessedLetters.includes(letter));
  };

  const renderHangman = () => {
    const incorrectGuessCount = guessedLetters.filter(
      (letter) => !targetWord.includes(letter)
    ).length;
    const hangmanParts = [
      <line
        key="1"
        x1="10"
        y1="70"
        x2="40"
        y2="70"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="2"
        x1="25"
        y1="70"
        x2="25"
        y2="10"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="3"
        x1="25"
        y1="10"
        x2="50"
        y2="10"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="4"
        x1="50"
        y1="10"
        x2="50"
        y2="20"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <circle key="5" cx="50" cy="25" r="5" fill="#2E2E2E" />,
      <line
        key="6"
        x1="50"
        y1="30"
        x2="50"
        y2="50"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="7"
        x1="45"
        y1="55"
        x2="50"
        y2="50"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="8"
        x1="55"
        y1="55"
        x2="50"
        y2="50"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="9"
        x1="50"
        y1="35"
        x2="45"
        y2="40"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
      <line
        key="10"
        x1="50"
        y1="35"
        x2="55"
        y2="40"
        stroke="#2E2E2E"
        strokeWidth="2"
      />,
    ];
    return hangmanParts.slice(0, incorrectGuessCount);
  };

  const handleLetterClick = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
  };

  const renderAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return alphabet.map((letter, index) => (
      <button
        key={index}
        className={`px-4 py-2 m-1 border border-gray-400 rounded-lg text-gray-900 font-bold hover:bg-gray-200 transition duration-300 ${
          guessedLetters.includes(letter)
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white"
        }`}
        onClick={() => handleLetterClick(letter)}
        disabled={guessedLetters.includes(letter) || isGameWon()}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 text-white">
      <button
        className="mt-4 ml-4 bg-violet-500 mb-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
      <h1 className="text-3xl font-bold mb-4">Hangman Game</h1>
      <svg viewBox="0 0 60 80" width="200" height="200" className="mb-4">
        {renderHangman()}
      </svg>
      <div className="text-2xl mb-4">{getHiddenWord()}</div>
      <div className="flex flex-wrap justify-center">{renderAlphabet()}</div>
      {isGameWon() && (
        <div className="text-green-600 font-bold mt-4">
          {`Congratulations! You guessed the word "${targetWord}"!`}
        </div>
      )}
      {attemptCount >= maxAttempts && !isGameWon() && (
        <div className="text-red-600 font-bold mt-4">
          {`Sorry, you've run out of attempts. The word was "${targetWord}"`}
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
        onClick={handleReset}
        disabled={isGameWon() || attemptCount >= maxAttempts}
      >
        New Game
      </button>
    </div>
  );
};

export default HangmanGame;
