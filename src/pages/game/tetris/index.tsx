import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Tetris: React.FC = () => {
  const router = useRouter();

  const ROWS = 20;
  const COLS = 10;
  const CELL_SIZE = 21;

  type Shape = number[][];
  type Board = number[][];
  type Position = { x: number; y: number };

  const createEmptyBoard = (): Board => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  };

  const SHAPES: Shape[] = [
    [[1, 1, 1, 1]], // I
    [
      [1, 1, 1],
      [0, 1, 0],
    ], // T
    [
      [1, 1, 1],
      [1, 0, 0],
    ], // L
    [
      [1, 1, 1],
      [0, 0, 1],
    ], // J
    [
      [1, 1],
      [1, 1],
    ], // O
    [
      [1, 1, 0],
      [0, 1, 1],
    ], // S
    [
      [0, 1, 1],
      [1, 1, 0],
    ], // Z
  ];

  const getRandomShape = (): Shape => {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    return SHAPES[randomIndex];
  };

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentShape, setCurrentShape] = useState<Shape>(getRandomShape());
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isSpeedingUp, setIsSpeedingUp] = useState<boolean>(false);

  const moveShapeDown = () => {
    if (!currentPosition) return;

    const newPosY = currentPosition.y + 1;

    // Check collision with the bottom or other filled cells
    if (checkCollision(currentPosition.x, newPosY, currentShape)) {
      // Shape collided, update board and set new shape
      updateBoard(currentPosition.x, currentPosition.y, currentShape);
      const newShape = getRandomShape();
      setCurrentShape(newShape); // Set new random shape
      setCurrentPosition({ x: Math.floor(COLS / 2) - 1, y: 0 }); // Reset position
    } else {
      // Move shape down
      setCurrentPosition({ x: currentPosition.x, y: newPosY });
    }
  };

  const moveShapeLeft = () => {
    if (currentPosition) {
      const newPosX = currentPosition.x - 1;
      if (!checkCollision(newPosX, currentPosition.y, currentShape)) {
        setCurrentPosition({ x: newPosX, y: currentPosition.y });
      }
    }
  };

  const moveShapeRight = () => {
    if (currentPosition) {
      const newPosX = currentPosition.x + 1;
      if (!checkCollision(newPosX, currentPosition.y, currentShape)) {
        setCurrentPosition({ x: newPosX, y: currentPosition.y });
      }
    }
  };

  const rotateShape = () => {
    if (currentPosition) {
      const rotatedShape = currentShape[0]
        .map((_, index) => currentShape.map((row) => row[index]))
        .reverse();
      if (!checkCollision(currentPosition.x, currentPosition.y, rotatedShape)) {
        setCurrentShape(rotatedShape);
      }
    }
  };

  const checkCollision = (x: number, y: number, shape: Shape): boolean => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const boardRow = y + row;
          const boardCol = x + col;
          if (
            boardRow >= ROWS ||
            boardCol < 0 ||
            boardCol >= COLS ||
            (boardRow >= 0 &&
              boardRow < ROWS &&
              boardCol >= 0 &&
              boardCol < COLS &&
              board[boardRow][boardCol])
          ) {
            return true; // Collision detected
          }
        }
      }
    }
    return false; // No collision
  };

  const updateBoard = (x: number, y: number, shape: Shape) => {
    const newBoard = [...board];
    shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          const boardRow = y + rowIndex;
          const boardCol = x + colIndex;
          if (
            boardRow >= 0 &&
            boardRow < ROWS &&
            boardCol >= 0 &&
            boardCol < COLS
          ) {
            newBoard[boardRow][boardCol] = 1; // Set cell as filled
          }
        }
      });
    });
    setBoard(newBoard);
  };

  const startGame = () => {
    setIsStarted(true);
    setCurrentPosition({ x: Math.floor(COLS / 2) - 1, y: 0 });
  };

  useEffect(() => {
    if (isStarted) {
      const intervalId = setInterval(
        () => {
          moveShapeDown();
        },
        isSpeedingUp ? 100 : 1000
      );
      return () => clearInterval(intervalId);
    }
  }, [isStarted, isSpeedingUp, currentPosition]);

  const renderBoard = (): JSX.Element => {
    const renderedBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`cell ${
            cell ? "bg-red-400" : "bg-white"
          } border border-blue-200`}
          style={{ width: CELL_SIZE, height: CELL_SIZE }}
        />
      ))
    );

    if (currentPosition) {
      currentShape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const boardRow = rowIndex + currentPosition.y;
            const boardCol = colIndex + currentPosition.x;
            if (
              boardRow >= 0 &&
              boardRow < ROWS &&
              boardCol >= 0 &&
              boardCol < COLS
            ) {
              const key = `${boardRow}-${boardCol}`;
              const isFilledCell =
                renderedBoard[boardRow][boardCol].props.className.includes(
                  "bg-red-400"
                );
              if (!isFilledCell) {
                renderedBoard[boardRow][boardCol] = (
                  <div
                    key={key}
                    className={`cell bg-red-400 border border-blue-200`}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  />
                );
              }
            }
          }
        });
      });
    }

    return (
      <div
        className="board"
        style={{ width: COLS * CELL_SIZE, height: ROWS * CELL_SIZE }}
      >
        {renderedBoard.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tetris bg-gradient-to-br from-purple-400 to-yellow-600 h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl text-blue-100 font-bold  mt-2">Tetris</h1>
      <div className="mb-4">
        {!isStarted && (
          <button
            className="mt-2 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={startGame}
          >
            Start Game
          </button>
        )}
        <button
          className="mt-2 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/")}
        >
          back
        </button>
      </div>
      <div className="board border border-blue-200 inline-block">
        {renderBoard()}
      </div>

      <div className="controls mt-2 justify-center items-center">
        <button
          className="mt-2 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={moveShapeLeft}
        >
          Left
        </button>
        <button
          className="controls mt-2 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={moveShapeRight}
        >
          Right
        </button>
      </div>
      <div className="controls mt-2 justify-center items-center ">
        <button
          className="controls mt-4 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onMouseDown={() => setIsSpeedingUp(true)}
          onMouseUp={() => setIsSpeedingUp(false)}
        >
          Speed Down
        </button>
        <button
          className="mt-4 ml-4 bg-red-400 shadow-lg hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={rotateShape}
        >
          Rotate
        </button>
      </div>
    </div>
  );
};

export default Tetris;
