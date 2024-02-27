// pages/Menu.tsx

import Link from "next/link";
import React from "react";

const Menu: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Choose a Game:</h1>
        <ul className="flex flex-col items-center">
          <li className="mb-4">
            <Link href="/game/emoji-memory-match" passHref>
              <div className="block bg-purple-600 text-white p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                Emoji Memory Match
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/game/tic-tac-toe" passHref>
              <div className="block bg-pink-500 text-white p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                Tic Tac Toe
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/game/hangman" passHref>
              <div className="block bg-green-600 text-white p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                Hangman
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/game/snake-game" passHref>
              <div className="block bg-yellow-400 text-green-700 p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                Snake Game
              </div>
            </Link>
          </li>
          {/* Add more games here */}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
