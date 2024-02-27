import React from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-4">You won the game!</p>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
