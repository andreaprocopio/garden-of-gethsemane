"use client";

import React, { useRef, useState } from "react";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import BreathingPlayer, { BreathingPlayerHandle } from "./BreathingPlayer";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";

const MainControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRefs = [
    useRef<AudioPlayerHandle>(null),
    useRef<AudioPlayerHandle>(null),
    useRef<AudioPlayerHandle>(null),
  ];

  const breathingPlayerRef = useRef<BreathingPlayerHandle>(null);

  const toggleAllPlayback = () => {
    const allRefs = [...playerRefs, breathingPlayerRef];
    const ready = allRefs.every((ref) => ref.current !== null);
    if (!ready) {
      console.warn("Audio players are not ready yet.");
      return;
    }

    allRefs.forEach((ref) => {
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
      <Button
        onClick={toggleAllPlayback}
        variant="outline"
        className="rounded-full h-[70px] w-[70px] my-12 cursor-pointer"
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </Button>

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
          ref={playerRefs[2]}
          isPlaying={isPlaying}
          type="ambience-sounds"
        />
      </div>
      <BreathingPlayer ref={breathingPlayerRef} isPlaying={isPlaying} />
    </>
  );
};

export default MainControl;
