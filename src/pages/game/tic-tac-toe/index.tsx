import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const TicTacToe: React.FC = () => {
  const router = useRouter();
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    checkWinner();
  }, [board]); 

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return; 
      }
    }
  };

  const handleClick = (index: number) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setCurrentPlayer("X");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-400 via-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-pink-800">
          Tic Tac Toe
        </h1>
        <div className="grid grid-cols-3 gap-4 text-5xl text-center">
          {board.map((cell, index) => (
            <div
              key={index}
              className="bg-pink-400 text-white cursor-pointer flex items-center justify-center h-20 w-20 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="text-2xl font-semibold text-center mt-4 text-pink-800">
            {winner === "X" ? "Player X" : "Player O"} wins!
          </div>
        )}
        {!winner && board.every((cell) => cell !== "") && (
          <div className="text-2xl font-semibold text-center mt-4 text-pink-800">
            Its a draw!
          </div>
        )}
        <div className="flex justify-center mt-8 gap-8">
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
            onClick={resetGame}
          >
            Reset Game
          </button>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
            onClick={() => router.push("/")}
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
