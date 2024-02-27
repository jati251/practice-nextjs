import { useRouter } from "next/router";
import React, { useState } from "react";

const BetGame: React.FC = () => {
  const router = useRouter();

  const [betAmount, setBetAmount] = useState<number>(0);
  const [betNumber, setBetNumber] = useState<number>(1);
  const [diceNumber, setDiceNumber] = useState<number>(1);
  const [result, setResult] = useState<string>("");
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(10000);

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseInt(event.target.value);
    setBetAmount(amount);
  };

  const handleBetNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = parseInt(event.target.value);
    if (number < 7 && number > 0) {
      setBetNumber(number);
    }
  };

  const rollDice = () => {
    if (betAmount <= 0 || betAmount > balance) {
      setResult("Invalid bet amount!");
      return;
    }

    setIsRolling(true);
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomNumber);
      if (randomNumber === betNumber) {
        setResult("Congratulations! You won!");
        setBalance(balance + betAmount);
      } else {
        setResult("Sorry, you lost. Try again!");
        setBalance(balance - betAmount);
      }
      setIsRolling(false);
    }, 2000);
  };

  const closeModal = () => {
    setResult("");
    setDiceNumber(1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-400 to-pink-500 text-white">
      <button
        className="shadow-xl mt-4 ml-4 mb-8 bg-blue-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
      <h1 className="text-3xl font-bold mb-4">🎲 Bet Game 🎲</h1>
      <p className="p-5 text-xl">💰 Balance: ${balance}</p>
      <div className="mb-4">
        <label htmlFor="betAmount" className="mr-2">
          💰 Bet Amount:
        </label>
        <input
          type="number"
          id="betAmount"
          value={betAmount}
          onChange={handleBetAmountChange}
          className="border border-white rounded-md px-3 py-1 bg-transparent text-white focus:outline-none focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="betNumber" className="mr-2">
          🔢 Bet Number (1-6):
        </label>
        <input
          type="number"
          id="betNumber"
          value={betNumber}
          onChange={handleBetNumberChange}
          className="border border-white rounded-md px-3 py-1 bg-transparent text-white focus:outline-none focus:border-blue-300"
        />
      </div>
      <button
        onClick={rollDice}
        className={`bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-xl ${
          isRolling ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isRolling ? "Rolling..." : "Roll Dice 🎲"}
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
          result ? "visible" : "hidden"
        }`}
      >
        <div className="bg-purple-400 p-6 rounded-lg flex items-center justify-center flex-col">
          <img
            style={{ width: "200px", height: "150px" }}
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/08397f37-85aa-4dd4-b304-84834a375a8a/d1o03g8-011b5bf9-51f7-43e8-8a7b-8da86769c224.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA4Mzk3ZjM3LTg1YWEtNGRkNC1iMzA0LTg0ODM0YTM3NWE4YVwvZDFvMDNnOC0wMTFiNWJmOS01MWY3LTQzZTgtOGE3Yi04ZGE4Njc2OWMyMjQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tEE2wyy0d0ebn1PbxLe38yZbg2aIG7Ao1qH3Kvx7Zss"
            alt="Rolling Dice"
            className="mb-4"
          />
          <p className="text-lg font-bold mb-4">{result}</p>
          {result && <p className="mt-2">🎲 Dice rolled: {diceNumber} 🎲</p>}
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetGame;
