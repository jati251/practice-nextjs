import { useRouter } from "next/router";
import { useState } from "react";

const GuessingGame = () => {
  const router = useRouter();
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleGuessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const checkGuess = () => {
    const parsedGuess = parseInt(guess);

    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100.");
      setShowModal(true);
    } else {
      setAttempts(attempts + 1);

      if (parsedGuess === randomNumber) {
        setMessage(
          `🎉 Congratulations! You guessed the number ${randomNumber} correctly in ${attempts} attempts.`
        );
      } else if (parsedGuess < randomNumber) {
        setMessage("🔽 Too low! Try a higher number.");
        setShowModal(true);
      } else {
        setMessage("🔼 Too high! Try a lower number.");
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <button
        className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md hover:bg-pink-600"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
      <h1 className="text-3xl font-bold mb-4">Number Guessing Game</h1>
      <p className="text-lg mb-2">Guess a number between 1 and 100:</p>
      <input
        type="number"
        className="border-2 border-white rounded-lg px-4 py-2 bg-transparent text-white placeholder-white placeholder-opacity-50 mb-4"
        value={guess}
        onChange={handleGuessChange}
        placeholder="Enter your guess"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition duration-300 ease-in-out"
        onClick={checkGuess}
      >
        Submit Guess
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-xl mb-4 text-black">{message}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessingGame;
