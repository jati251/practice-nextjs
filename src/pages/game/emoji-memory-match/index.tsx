import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Popup from "@/components/popup";

const EmojiMemoryMatch: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

  useEffect(() => {
    const shuffledEmojis = emojis
      .concat(emojis)
      .sort(() => Math.random() - 0.5);
    setCards(shuffledEmojis);
  }, []);

  const handleCardClick = (index: number) => {
    if (matchedCards.includes(index) || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
        setScore(score + 10);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setScore(Math.max(score - 5, 0));
        }, 1000);
      }
    }

    setMoves(moves + 1);
  };

  useEffect(() => {
    if (matchedCards.length === 0) {
      closeModal();
    }

    if (matchedCards.length === cards.length) {
      setGameOver(true);
      setShowModal(true);
    }
  }, [matchedCards, cards]);

  const restartGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
    setGameOver(false);
    const shuffledEmojis = emojis
      .concat(emojis)
      .sort(() => Math.random() - 0.5);
    setCards(shuffledEmojis);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderGameBoard = () => {
    return cards.map((emoji, index) => (
      <div
        key={index}
      className={`w-20 h-20 bg-purple-500 rounded-md flex items-center justify-center text-white text-3xl cursor-pointer transform transition-all duration-300 ${
          flippedCards.includes(index) || matchedCards.includes(index) ? 'rotate-0' : 'rotate-180'
        }`}
        onClick={() => handleCardClick(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-500">
          {flippedCards.includes(index) || matchedCards.includes(index) ? (
            <span className="text-4xl">{emoji}</span>
          ) : (
            <span className="text-4xl">?</span>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-200">
      <h1 className="text-3xl font-bold mb-4 text-purple-800">
        Emoji Memory Match
      </h1>
      <div className="grid grid-cols-4 gap-4">{renderGameBoard()}</div>
      <div className="mt-8 text-center">
        <p className="text-purple-800">Moves: {moves}</p>
        <p className="text-purple-800">Score: {score}</p>
        {gameOver && (
          <button
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={restartGame}
          >
            Restart Game
          </button>
        )}
        {showModal && <Popup onClose={closeModal} />}
        <button
          className="mt-4 ml-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/")}
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
};

export default EmojiMemoryMatch;
