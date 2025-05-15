"use client";

import React, { useRef, useState } from "react";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import BreathingPlayer, { BreathingPlayerHandle } from "./BreathingPlayer";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPresets } from "@/lib/defaultPresets";
import { Preset } from "@/lib/types";

const MainControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(
    defaultPresets[0].presetValues
  );

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

  const handlePresetChange = (value: string) => {
    const parsed = JSON.parse(value) as Preset;
    setSelectedPreset(parsed);
  };

  return (
    <>
      <Button
        onClick={toggleAllPlayback}
        variant="outline"
        className="rounded-full h-[70px] w-[70px] my-12 cursor-pointer"
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </Button>

      <div>
        <label className="text-sm mb-1 block">Presets</label>
        <Select
          onValueChange={handlePresetChange}
          value={JSON.stringify(selectedPreset)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a preset" />
          </SelectTrigger>
          <SelectContent>
            {defaultPresets.map((preset) => (
              <SelectItem
                key={preset.name}
                value={JSON.stringify(preset.presetValues)}
              >
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-6 justify-center my-12">
        <AudioPlayer
          ref={playerRefs[0]}
          isPlaying={isPlaying}
          type="isochronic-tones"
          presetVolume={selectedPreset["isochronic-tones"].volume}
          presetEnable={selectedPreset["isochronic-tones"].enabled}
          presetTrack={selectedPreset["isochronic-tones"].trackSrc}
        />
        <AudioPlayer
          ref={playerRefs[1]}
          isPlaying={isPlaying}
          type="brown-noise"
          presetVolume={selectedPreset["brown-noise"].volume}
          presetEnable={selectedPreset["brown-noise"].enabled}
          presetTrack={selectedPreset["brown-noise"].trackSrc}
        />
        <AudioPlayer
          ref={playerRefs[2]}
          isPlaying={isPlaying}
          type="ambience-sounds"
          presetVolume={selectedPreset["ambience-sounds"].volume}
          presetEnable={selectedPreset["ambience-sounds"].enabled}
          presetTrack={selectedPreset["ambience-sounds"].trackSrc}
        />
      </div>

      <BreathingPlayer
        ref={breathingPlayerRef}
        isPlaying={isPlaying}
        presetEnable={selectedPreset["guided-breathing"].enabled}
        presetVolume={selectedPreset["guided-breathing"].volume}
      />
    </>
  );
};

export default MainControl;
