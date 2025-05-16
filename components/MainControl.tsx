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
import { Preset, Sound } from "@/db/schema";
import { PresetValues } from "@/lib/types";

interface MainControlProps {
  isochronicTones: Sound[];
  brownNoises: Sound[];
  ambienceSounds: Sound[];
}

const MainControl = ({
  isochronicTones,
  brownNoises,
  ambienceSounds,
}: MainControlProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(
    defaultPresets[0]
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

  const isochronicTonesPreset = selectedPreset.isochronic_tones as PresetValues;

  const brownNoisePreset = selectedPreset.brown_noises as PresetValues;

  const ambienceSoundsPreset = selectedPreset.ambience_sounds as PresetValues;

  const guidedBreathingPreset = selectedPreset.guided_breathing as PresetValues;

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
              <SelectItem key={preset.name} value={JSON.stringify(preset)}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-6 justify-center my-12">
        <AudioPlayer
          sounds={isochronicTones}
          ref={playerRefs[0]}
          isPlaying={isPlaying}
          type="isochronic-tones"
          presetProps={isochronicTonesPreset}
        />
        <AudioPlayer
          sounds={brownNoises}
          ref={playerRefs[1]}
          isPlaying={isPlaying}
          type="brown-noise"
          presetProps={brownNoisePreset}
        />
        <AudioPlayer
          sounds={ambienceSounds}
          ref={playerRefs[2]}
          isPlaying={isPlaying}
          type="ambience-sounds"
          presetProps={ambienceSoundsPreset}
        />
      </div>

      <BreathingPlayer
        ref={breathingPlayerRef}
        isPlaying={isPlaying}
        presetProps={guidedBreathingPreset}
      />
    </>
  );
};

export default MainControl;
