"use client";

import React, { useRef, useState } from "react";
import AudioPlayer, { AudioPlayerHandle } from "./AudioPlayer";
import BreathingPlayer, { BreathingPlayerHandle } from "./BreathingPlayer";
import DeletePresetButton from "./DeletePresetButton";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultPresets } from "@/lib/defaultPresets";
import { Preset, Sound } from "@/db/schema";

import { PresetValues } from "@/lib/types";
import _ from "lodash";
import SavePresetButton from "./SavePresetButton";

interface MainControlProps {
  isochronicTones: Sound[];
  brownNoises: Sound[];
  ambienceSounds: Sound[];
  userPresets: Preset[];
}

const MainControl = ({
  isochronicTones,
  brownNoises,
  ambienceSounds,
  userPresets,
}: MainControlProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(
    defaultPresets[0]
  );

  const [modified, setModified] = useState(false);

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
    setModified(false);
    setSelectedPreset(parsed);
  };

  const isModified = () => {
    const ref0 = playerRefs[0].current;
    const ref1 = playerRefs[1].current;
    const ref2 = playerRefs[2].current;
    const breathing = breathingPlayerRef.current;

    if (!ref0 || !ref1 || !ref2 || !breathing) return false;

    const currentIsochronic = ref0.getPreset?.();
    const currentBrown = ref1.getPreset?.();
    const currentAmbience = ref2.getPreset?.();
    const currentBreathing = breathing.getPreset?.();

    return !(
      _.isEqual(currentIsochronic, selectedPreset.isochronic_tones) &&
      _.isEqual(currentBrown, selectedPreset.brown_noises) &&
      _.isEqual(currentAmbience, selectedPreset.ambience_sounds) &&
      _.isEqual(currentBreathing, selectedPreset.guided_breathing)
    );
  };

  const updateModificationState = () => {
    setModified(isModified());
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
            {/* User presets */}
            {userPresets.map((preset) => (
              <div
                className="flex items-center justify-between"
                key={preset.id}
              >
                <SelectItem value={JSON.stringify(preset)}>
                  {preset.name}
                </SelectItem>
                <DeletePresetButton presetId={preset.id} />
              </div>
            ))}
            {/* Separator (opzionale) */}
            {userPresets.length > 0 && defaultPresets.length > 0 && (
              <SelectSeparator />
            )}
            {/* Default presets */}
            {defaultPresets.map((preset) => (
              <SelectItem key={preset.name} value={JSON.stringify(preset)}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {modified && (
        <SavePresetButton
          playerRefs={playerRefs}
          breathingRef={breathingPlayerRef}
          selectedPreset={selectedPreset}
          onSaved={(updated) => {
            setSelectedPreset(updated);
            setModified(false);
          }}
        />
      )}

      <div className="flex flex-wrap gap-6 justify-center my-12">
        <AudioPlayer
          sounds={isochronicTones}
          ref={playerRefs[0]}
          isPlaying={isPlaying}
          type="isochronic-tones"
          presetProps={isochronicTonesPreset}
          isModified={updateModificationState}
        />
        <AudioPlayer
          sounds={brownNoises}
          ref={playerRefs[1]}
          isPlaying={isPlaying}
          type="brown-noise"
          presetProps={brownNoisePreset}
          isModified={updateModificationState}
        />
        <AudioPlayer
          sounds={ambienceSounds}
          ref={playerRefs[2]}
          isPlaying={isPlaying}
          type="ambience-sounds"
          presetProps={ambienceSoundsPreset}
          isModified={updateModificationState}
        />
      </div>

      <BreathingPlayer
        ref={breathingPlayerRef}
        isPlaying={isPlaying}
        presetProps={guidedBreathingPreset}
        isModified={updateModificationState}
      />
    </>
  );
};

export default MainControl;
