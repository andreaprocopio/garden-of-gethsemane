// app/AudioPlayer.tsx
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
import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

export type AudioPlayerHandle = {
  play: () => void;
  pause: () => void;
};

const isochronicTonesOptions = [
  { label: "8 HZ", value: "/isochronic-8hz.mp3" },
  { label: "10 HZ", value: "/isochronic-10hz.mp3" },
  { label: "40 HZ", value: "/isochronic-40hz.mp3" },
];

const brownNoiseOptions = [
  { label: "Soft brow noise", value: "/soft-brown-noise.mp3" },
  {
    label: "Relaxing layered brown noise",
    value: "/relaxing-layered-brown-noise.mp3",
  },
  {
    label: "Relaxing smoothed brow noise",
    value: "/relaxing-smoothed-brown-noise.mp3",
  },
];

const ambienceOptions = [{ label: "Gentle Rain", value: "/gentle-rain.mp3" }];

interface AudioPlayerProps {
  isPlaying: boolean;
  type: "isochronic-tones" | "brown-noise" | "ambience-sounds";
}

const audioOptionsMap = {
  "isochronic-tones": isochronicTonesOptions,
  "brown-noise": brownNoiseOptions,
  "ambience-sounds": ambienceOptions,
} as const;

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  ({ isPlaying, type }, ref) => {
    const options = audioOptionsMap[type];
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(1);
    const [src, setSrc] = useState(options[0].value);
    const [enabled, setEnabled] = useState(true);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (enabled) {
          audioRef.current?.play();
        }
      },
      pause: () => audioRef.current?.pause(),
    }));

    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0];
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    };

    const handleSrcChange = (value: string) => {
      setSrc(value);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load(); // Reload new source
      }
    };

    // Play audio if enabled and isPlaying becomes true
    useEffect(() => {
      if (enabled && isPlaying && src) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }, [enabled, isPlaying, src]);

    return (
      <Card
        className={`block shrink-0 min-w-xs md:min-w-md transition-opacity duration-300 ${
          enabled ? "" : "opacity-50"
        }`}
      >
        <CardHeader>
          <CardTitle>Audio Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Attivo</span>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <div>
            <label className="text-sm mb-1 block">Scegli traccia</label>
            <Select value={src} onValueChange={handleSrcChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Volume</label>
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
            />
          </div>

          <audio ref={audioRef} src={src} loop />
        </CardContent>
      </Card>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
