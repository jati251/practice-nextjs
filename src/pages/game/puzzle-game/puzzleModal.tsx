import React from "react";

interface ModalProps {
  onClose: () => void;
}

const PuzzleModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-pink-400 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p>You solved the puzzle!</p>
        <button
          onClick={onClose}
          className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PuzzleModal;
