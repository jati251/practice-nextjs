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
    // Here you can handle the submission of the input value
    if (value === "15nov") {
      setShowPopup(true);
      isCorrect(true);
    }
    // Optionally, you can clear the input value after submission
    setValue("");
  };

  const handleClosePopup = () => {
    // Hide the congratulations popup
    setShowPopup(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 max-h-screen min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center ">
          <form onSubmit={handleSubmit} className="flex mb-10 shadow-lg">
            <input
              type="text"
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
          {correct && (
            <li className="mb-4">
              <Link href="/game/valentino-dilla" passHref>
                <div className="block bg-pink-400 text-blue-700 p-6 rounded-md text-center hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                  Valentino Dilla
                </div>
              </Link>
            </li>
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
