import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const WordScrambleGame: React.FC = () => {
  const router = useRouter();

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
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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
    setIsWrong(false);
  };

  const checkGuess = () => {
    if (userGuess === currentWord) {
      setIsCorrect(true);
      setShowModal(true);
    } else {
      setIsWrong(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUserGuess("");
    setIsCorrect(false);
    setIsWrong(false);
    const randomIndex: number = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const getInputClassName = () => {
    if (userGuess === "") {
      return "border border-gray-300 text-black rounded-md px-3 py-1 mt-2 focus:outline-none focus:border-blue-500";
    } else if (isCorrect) {
      return "border border-green-500 text-black rounded-md px-3 py-1 mt-2 focus:outline-none focus:border-green-700";
    } else if (isWrong) {
      return "border border-red-500 text-black rounded-md px-3 py-1 mt-2 focus:outline-none focus:border-red-700";
    } else {
      return "border border-gray-300 text-black rounded-md px-3 py-1 mt-2 focus:outline-none focus:border-blue-500";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-400 to-pink-500 text-white">
      <button
        className="mt-4 ml-4 bg-blue-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
      <h1 className="text-3xl font-bold mb-4">Word Scramble Game</h1>
      <div className="mb-4 text-2xl">
        <p>Unscramble the word:</p>
        <p className="text-5xl font-bold">{scrambledWord}</p>
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          className={getInputClassName()}
          placeholder="Your guess"
          disabled={isCorrect}
        />
      </div>
      {isCorrect && (
        <div className="text-green-500 font-bold animate-pulse">
          Congratulations! You unscrambled the word!
        </div>
      )}
      {isWrong && (
        <div className="text-red-500 bg-blue-300 p-2 rounded shadow-lg mb-4 font-bold">
          {`Sorry, that's incorrect. Try again!`}
        </div>
      )}
      <button
        onClick={checkGuess}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Check Guess
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-purple-400 p-6 rounded-lg justify-center flex flex-col items-center">
            <p className="text-lg font-bold mb-4">Congratulations!</p>
            <p className="mb-4">{`You unscrambled the word "${currentWord}"!`}</p>
            <button
              onClick={closeModal}
              className="bg-teal-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordScrambleGame;
