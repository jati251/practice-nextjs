import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { useRouter } from "next/router";

const PuzzleGame: React.FC = () => {
  const router = useRouter();

  const [board, setBoard] = useState<number[][]>([]);
  const [size, setSize] = useState<number>(3); // Size of the board (3x3 by default)
  const [moves, setMoves] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [imagePieces, setImagePieces] = useState<string[]>([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (isSolved) {
      setShowModal(true);
    }
  }, [isSolved]);

  // Generate image pieces
  useEffect(() => {
    generateImagePieces();
  }, [size]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to check if a puzzle configuration is solvable
  const isSolvable = (board: number[]) => {
    let inversions = 0;
    const size = Math.sqrt(board.length);

    // Count the number of inversions
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        if (board[i] > board[j] && board[i] !== 0 && board[j] !== 0) {
          inversions++;
        }
      }
    }

    if (size % 2 === 1) {
      return inversions % 2 === 0;
    }

    const emptyRowIndex = Math.floor(board.indexOf(0) / size);
    if (emptyRowIndex % 2 === 0) {
      return inversions % 2 === 1;
    } else {
      return inversions % 2 === 0;
    }
  };

  const initializeBoard = () => {
    const size = 3; // Size of the board (3x3)
    const boardSize = size * size;

    const solvedState = Array.from({ length: boardSize }, (_, i) => i);

    let shuffledState = shuffleArray(solvedState);

    while (!isSolvable(shuffledState)) {
      shuffledState = shuffleArray(solvedState);
    }

    const newBoard: number[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard.push(shuffledState.slice(i * size, (i + 1) * size));
    }

    setBoard(newBoard);
    setIsSolved(false);
    setMoves(0);
  };

  // Check if the puzzle is solved
  const checkIfSolved = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] !== i * size + j) {
          return false;
        }
      }
    }
    return true;
  };

  const swapPieces = (
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ) => {
    const newBoard = [...board];
    const temp = newBoard[row1][col1];
    newBoard[row1][col1] = newBoard[row2][col2];
    newBoard[row2][col2] = temp;
    setBoard(newBoard);
    setMoves(moves + 1);
    if (!isSolved) {
      setIsSolved(checkIfSolved());
    }
  };

  // Handle click on a puzzle piece
  const handleClick = (row: number, col: number) => {
    // Check if adjacent cell is empty
    if (row > 0 && board[row - 1][col] === 0) {
      swapPieces(row, col, row - 1, col);
    } else if (row < size - 1 && board[row + 1][col] === 0) {
      swapPieces(row, col, row + 1, col);
    } else if (col > 0 && board[row][col - 1] === 0) {
      swapPieces(row, col, row, col - 1);
    } else if (col < size - 1 && board[row][col + 1] === 0) {
      swapPieces(row, col, row, col + 1);
    }
  };

  const generateImagePieces = () => {
    const pieces = [];
    for (let i = 1; i <= size * size; i++) {
      pieces.push(`/${i}.jpg`); // Replace with the paths to your image pieces
    }
    setImagePieces(pieces);
  };

  // Render the puzzle pieces
  const renderPuzzle = () => {
    return (
      <div
        className=" bg-white shadow"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 100px)`,
          gap: "4px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`p-4 border border-gray-400 ${
                cell === 0 ? "bg-gray-200" : ""
              }`}
            >
              {cell !== 0 && (
                <img
                  src={imagePieces[cell - 1]}
                  alt={`Piece ${cell}`}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-400 to-pink-500">
      <button
        className="mt-4 ml-4 mb-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded shadow-lg"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
      <h1 className="text-3xl font-bold mb-4">🧩 Puzzle Game 🧩</h1>

      <p>Moves: {moves}</p>
      <div className="border border-gray-400 rounded-lg mt-4">
        {renderPuzzle()}
      </div>
      <button
        onClick={initializeBoard}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md mt-4 shadow-lg"
      >
        New Game
      </button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PuzzleGame;
