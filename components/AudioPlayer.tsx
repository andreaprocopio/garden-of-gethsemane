"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Sound } from "@/db/schema";
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { PresetValues } from "@/lib/types";

export type AudioPlayerHandle = {
  play: () => void;
  pause: () => void;
  getPreset: () => PresetValues;
};

interface AudioPlayerProps {
  sounds: Sound[];
  isPlaying: boolean;
  type: "isochronic-tones" | "brown-noise" | "ambience-sounds";
  presetProps: PresetValues;
  isModified: () => void;
}

const cardTitleMap = {
  "isochronic-tones": "Isochronic tones",
  "brown-noise": "Brown noise",
  "ambience-sounds": "Ambience sounds",
} as const;

const loadPresetTrackOrDefault = (sounds: Sound[], presetTrack?: string) => {
  const foundOption = sounds.find((sound) => sound.src === presetTrack);
  return foundOption ? foundOption.src : sounds[0].src;
};

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  ({ sounds, isPlaying, type, presetProps, isModified }, ref) => {
    const cardTitle = cardTitleMap[type];
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [preset, setPreset] = useState<PresetValues>({
      volume: presetProps.volume,
      enabled: presetProps.enabled,
      trackSrc: loadPresetTrackOrDefault(sounds, presetProps.trackSrc),
    });

    useImperativeHandle(ref, () => ({
      play: () => {
        if (preset.enabled) {
          audioRef.current?.play();
        }
      },
      pause: () => audioRef.current?.pause(),
      getPreset: () => preset,
    }));

    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0];
      setPreset((prev) => ({ ...prev, volume: newVolume }));
      if (audioRef.current) audioRef.current.volume = newVolume;
    };

    const handleSrcChange = (value: string) => {
      setPreset((prev) => {
        return {
          ...prev,
          trackSrc: value,
        };
      });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load(); // Reload new source
      }
    };

    // Play audio if enabled and isPlaying becomes true
    useEffect(() => {
      if (preset.enabled && isPlaying && preset.trackSrc) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }, [preset.enabled, isPlaying, preset.trackSrc]);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = preset.volume;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Imposta il volume ogni volta che cambia
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = preset.volume;
      }
    }, [preset.volume]);

    const isPresetUpdate = useRef(false);

    useEffect(() => {
      isPresetUpdate.current = true;
      setPreset((prev) => {
        return {
          ...prev,
          enabled: presetProps.enabled,
          trackSrc: presetProps.trackSrc || sounds[0].src,
          volume: presetProps.volume,
        };
      });
    }, [presetProps, sounds]);

    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (isPresetUpdate.current) {
        isPresetUpdate.current = false;
        return;
      }
      console.log("calling is modified");
      isModified();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preset]);

    return (
      <Card
        className={`block shrink-0 min-w-xs md:min-w-md transition-opacity duration-300 ${
          preset.enabled ? "" : "opacity-50"
        }`}
      >
        <CardHeader className="flex items-center justify-between mb-6">
          <CardTitle>{cardTitle}</CardTitle>
          <Switch
            checked={preset.enabled}
            onCheckedChange={() => {
              setPreset((prev) => {
                return {
                  ...prev,
                  enabled: !prev.enabled,
                };
              });
            }}
            className="cursor-pointer"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Tracks</label>
            <Select value={preset.trackSrc} onValueChange={handleSrcChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sounds.map((sound) => (
                  <SelectItem key={sound.src} value={sound.src}>
                    {sound.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Volume</label>
            <Slider
              value={[preset.volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>

          <audio ref={audioRef} src={preset.trackSrc} loop />
        </CardContent>
      </Card>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
