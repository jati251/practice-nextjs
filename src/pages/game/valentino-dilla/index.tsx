import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const loveMessages = [
  "You make my heart skip a beat.",
  "I love you more than words can express.",
  "You are the light of my life.",
  "You mean everything to me.",
  "My love for you grows stronger every day.",
  "You are my soulmate.",
  "I am grateful for your love.",
  "You are the best thing that ever happened to me.",
  "I can't imagine my life without you.",
  "You complete me.",
  "I cherish every moment with you.",
];
const noMessage = [
  "No",
  "you sure ?",
  "are you really sure ?",
  "think again",
  "last change",
  "come on  :(",
  "im sad , please dont",
  "how dare you",
  "i hate you",
];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * loveMessages.length);
  return loveMessages[randomIndex];
};

const ValentinePage = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Will you be my Valentine?");
  const [play, setPlay] = useState(false);
  const [click, setclick] = useState(0);
  const [next, isnext] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const handleYesClick = () => {
    setShowHearts(true);
    setTitle('Yeayy, thank you so much :"""DDD');
  };

  const generateMessage = () => {
    const randomMessage = getRandomMessage();
    setMessage(randomMessage);
    setPlay(true);
    setclick(click + 1);
  };

  const handleNoClick = () => {
    if (noClicks < noMessage.length) {
      setNoClicks(noClicks + 1);
    }
  };

  useEffect(() => {
    const audioElement = document.getElementById(
      "audioPlayer"
    ) as HTMLAudioElement;
    if (audioElement && play) {
      audioElement.play();
    }
  }, [play]);

  useEffect(() => {
    if (click > 5) {
      isnext(true);
    }
  }, [click]);

  return (
    <div className="bg-pink-400 min-h-screen flex flex-col items-center justify-center">
      <img src="/dilla.png" className="w-64 h-auto" alt="logo" />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{`Happy Valentine's Day!`}</h1>
        {next ? (
          <div>
            <p className="text-lg mb-8">{title}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                style={{ fontSize: 16 + noClicks * 20 }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                style={{ width: 100, height: "100%" }}
                onClick={handleNoClick}
              >
                {noMessage[noClicks]}{" "}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-8">{`Welcome to our Valentine's Day page Dilla. Click the button below to generate a love message!`}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={generateMessage}
            >
              Generate Love Message
            </button>
            <p className="text-lg mt-4 animate-bounce">{message}</p>
          </div>
        )}
      </div>
      {showHearts && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img src="./love.png" className="w-28 h-w-28 animate-spin" />
          <img src="./love.png" className="w-28 h-w-28 animate-spin" />
          <img src="./love.png" className="w-28 h-w-28 animate-spin" />
        </div>
      )}
      <audio id="audioPlayer" autoPlay>
        <source src="/audio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button
        className="mt-4 ml-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/")}
      >
        Return to Menu
      </button>
    </div>
  );
};

export default ValentinePage;
