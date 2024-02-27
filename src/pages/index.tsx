// pages/Menu.tsx

import Link from "next/link";
import React, { useState } from "react";

const Menu: React.FC = () => {
  const [value, setValue] = useState("");
  const [correct, isCorrect] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === "15nov") {
      setShowPopup(true);
      isCorrect(true);
    }

    setValue("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const routes = [
    {
      href: "/game/emoji-memory-match",
      label: "Emoji Memory Match",
      color: "red",
    },
    {
      href: "/game/tic-tac-toe",
      label: "Tic Tac Toe",
      color: "blue",
    },
    {
      href: "/game/hangman",
      label: "Hangman",
      color: "pink",
    },
    {
      href: "/game/snake-game",
      label: "Snake Game",
      color: "red",
    },
    {
      href: "/game/calculator",
      label: "Calculator",
      color: "blue",
    },
    {
      href: "/game/rock-paper-scissors",
      label: "Rock Papers Scissors",
      color: "pink",
    },
    {
      href: "/game/tetris",
      label: "Tetris",
      color: "red",
    },
    {
      href: "/game/guessing-game",
      label: "Tebak Tebakan",
      color: "blue",
    },
    {
      href: "/game/word-scramble",
      label: "Tebak Huruf",
      color: "pink",
    },
    {
      href: "/game/bet-game",
      label: "Game Judi",
      color: "red",
    },
  ];

  const CustomLink = ({
    href,
    label,
    color,
  }: {
    href: string;
    label: string;
    color: string;
  }) => {
    return (
      <li className="mb-4">
        <Link href={href}>
          <div
            className={`block bg-${color}-400 text-white p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer`}
          >
            {label}
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 max-h-screen min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[85%]">
        <div className="flex items-center justify-center ">
          <form onSubmit={handleSubmit} className="flex mb-10 shadow-lg">
            <input
              type="password"
              value={value}
              onChange={handleChange}
              className="appearance-none  border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:border-blue-500"
              placeholder="Enter Passcode"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Choose a Game:</h1>
        <ul className="flex flex-col items-center overflow-y-auto h-[400px]">
          {routes.map((el, i) => (
            <CustomLink
              color={el.color}
              key={i}
              href={el.href}
              label={el.label}
            />
          ))}

          {correct && (
            <CustomLink
              color={"blue"}
              href="/game/valentino-dilla"
              label="Valentino Dilla"
            />
          )}
          {/* Add more games here */}
        </ul>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg ">
            <p className="text-2xl font-bold mb-4 text-pink-600 text-center">
              🎉 Congratulations! 🎉
            </p>
            <p className="text-lg text-purple-800 text-center">{`Welcome Dilla !`}</p>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 focus:outline-none focus:bg-pink-600"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
