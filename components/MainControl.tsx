"use client";

import React, { useRef, useState } from "react";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import BreathingPlayer from "./BreathingPlayer";

const MainControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRefs = [
    useRef<AudioPlayerHandle>(null),
    useRef<AudioPlayerHandle>(null),
  ];

  const toggleAllPlayback = () => {
    const ready = playerRefs.every((ref) => ref.current !== null);
    if (!ready) {
      console.warn("Audio players are not ready yet.");
      return;
    }

    playerRefs.forEach((ref) => {
      if (isPlaying) {
        ref.current?.pause();
      } else {
        ref.current?.play();
      }
    });

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* ✅ Play button */}
      <button
        onClick={toggleAllPlayback}
        className="px-6 py-3 bg-green-600 text-white rounded-lg mb-4"
      >
        {isPlaying ? "Pause All" : "Play All"}
      </button>

      <div className="flex flex-wrap gap-6 justify-center my-12">
        <AudioPlayer
          ref={playerRefs[0]}
          isPlaying={isPlaying}
          type="isochronic-tones"
        />
        <AudioPlayer
          ref={playerRefs[1]}
          isPlaying={isPlaying}
          type="brown-noise"
        />

        <AudioPlayer
          ref={playerRefs[1]}
          isPlaying={isPlaying}
          type="ambience-sounds"
        />
      </div>
      <BreathingPlayer />
    </>
  );
};

export default MainControl;
