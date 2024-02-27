import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 19;
const CELL_SIZE = 19;
const INITIAL_SNAKE_LENGTH = 5;
const INITIAL_DIRECTION = "right";
const INITIAL_SPEED = 150; // in milliseconds

const SnakeGame: React.FC = () => {
  const generateRandomPosition = (): [number, number] => {
    let position: [number, number];
    do {
      position = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
    } while (snake.some(([x, y]) => x === position[0] && y === position[1]));
    return position;
  };

  const router = useRouter();

  const [snake, setSnake] = useState<[number, number][]>([]);
  const [food, setFood] = useState<[number, number]>(generateRandomPosition());
  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [score, setScore] = useState<number>(0);

  const resetGame = () => {
    setSnake(createInitialSnake());
    setFood(generateRandomPosition());
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    setScore(0);
  };

  const createInitialSnake = (): [number, number][] => {
    const initialSnake: [number, number][] = [];
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push([startX - i, startY]);
    }
    return initialSnake;
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    let head = newSnake[0];

    switch (direction) {
      case "up":
        head = [head[0], (head[1] - 1 + GRID_SIZE) % GRID_SIZE];
        break;
      case "down":
        head = [head[0], (head[1] + 1) % GRID_SIZE];
        break;
      case "left":
        head = [(head[0] - 1 + GRID_SIZE) % GRID_SIZE, head[1]];
        break;
      case "right":
        head = [(head[0] + 1) % GRID_SIZE, head[1]];
        break;
    }

    // Check if the snake hits the wall or itself
    if (
      newSnake.some(
        (segment) => segment[0] === head[0] && segment[1] === head[1]
      ) ||
      head[0] < 0 ||
      head[0] >= GRID_SIZE ||
      head[1] < 0 ||
      head[1] >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check if snake eats food
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(generateRandomPosition());
      setScore((prevScore) => prevScore + 1);
      // Increase speed slightly as the snake gets longer
      setSpeed((prevSpeed) => prevSpeed * 0.95);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "down") setDirection("up");
          break;
        case "ArrowDown":
          if (direction !== "up") setDirection("down");
          break;
        case "ArrowLeft":
          if (direction !== "right") setDirection("left");
          break;
        case "ArrowRight":
          if (direction !== "left") setDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    // Initialize snake
    setSnake(createInitialSnake());
  }, []);

  const handleDirectionButtonClick = (newDirection: string) => {
    if (
      (direction === "up" && newDirection !== "down") ||
      (direction === "down" && newDirection !== "up") ||
      (direction === "left" && newDirection !== "right") ||
      (direction === "right" && newDirection !== "left")
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div
        className="relative bg-gray-800"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment[0] * CELL_SIZE,
              top: segment[1] * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="absolute bg-red-500"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food[0] * CELL_SIZE,
            top: food[1] * CELL_SIZE,
          }}
        />
        <div className="absolute top-0 left-0 p-4 text-white text-lg">
          Score: {score}
        </div>
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl bg-black bg-opacity-50">
            Game Over! Score: {score}
            <button
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={resetGame}
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={() => handleDirectionButtonClick("up")}
        >
          Up
        </button>
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={() => handleDirectionButtonClick("left")}
        >
          Left
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={() => handleDirectionButtonClick("right")}
        >
          Right
        </button>
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          onClick={() => handleDirectionButtonClick("down")}
        >
          Down
        </button>
      </div>
      <button
        className="mt-4 ml-4 bg-green-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
    </div>
  );
};

export default SnakeGame;
