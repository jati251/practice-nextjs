import { useRouter } from "next/router";
import React, { useState } from "react";

const RockPaperScissors: React.FC = () => {
  const router = useRouter();

  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [score, setScore] = useState<{
    wins: number;
    losses: number;
    ties: number;
  }>({ wins: 0, losses: 0, ties: 0 });
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const choices: string[] = ["👊", "✋", "✌️"];

  const getRandomChoice = (): string => {
    const randomIndex: number = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const handlePlayerChoice = (choice: string): void => {
    const computerChoice: string = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    calculateResult(choice, computerChoice);
    setModalOpen(true);
  };

  const calculateResult = (
    playerChoice: string,
    computerChoice: string
  ): void => {
    let newResult: string = "";
    let newScore = { ...score };
    if (playerChoice === computerChoice) {
      newResult = "😐 It's a tie!";
      newScore.ties++;
    } else if (
      (playerChoice === "👊" && computerChoice === "✌️") ||
      (playerChoice === "✋" && computerChoice === "👊") ||
      (playerChoice === "✌️" && computerChoice === "✋")
    ) {
      newResult = "😄 You win!";
      newScore.wins++;
    } else {
      newResult = "😢 Computer wins!";
      newScore.losses++;
    }
    setResult(newResult);
    setScore(newScore);
  };

  const resetGame = (): void => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-pink-600">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Rock, Paper, Scissors
      </h1>
      <div className="flex justify-center mb-4">
        {choices.map((choice) => (
          <button
            key={choice}
            className="text-5xl mx-2 cursor-pointer transition duration-300 transform hover:scale-110"
            onClick={() => handlePlayerChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-black text-2xl mb-4">
              <p>You chose: {playerChoice}</p>
              <p>Computer chose: {computerChoice}</p>
            </div>
            <h2 className="text-3xl font-bold mb-4">{result}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="text-white text-2xl">
        <p>Wins: {score.wins} 😄</p>
        <p>Losses: {score.losses} 😢</p>
        <p>Ties: {score.ties} 😐</p>
      </div>
      <button
        className="mt-4 ml-4 bg-blue-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
    </div>
  );
};

export default RockPaperScissors;
