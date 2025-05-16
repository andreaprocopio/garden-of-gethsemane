"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PresetValues } from "@/lib/types";

const PHASES = ["breathe_in", "hold_in", "breathe_out", "hold_out"] as const;
type Phase = (typeof PHASES)[number];

export type BreathingPlayerHandle = {
  play: () => void;
  pause: () => void;
  getPreset: () => PresetValues;
};

interface BreathingPlayerProps {
  isPlaying: boolean;
  presetProps: PresetValues;
  isModified: () => void;
}

const BreathingPlayer = forwardRef<BreathingPlayerHandle, BreathingPlayerProps>(
  ({ isPlaying, presetProps, isModified }, ref) => {
    const [preset, setPreset] = useState<PresetValues>({
      volume: presetProps.volume,
      enabled: presetProps.enabled,
      breathingPhasesValues: {
        breathe_in: presetProps.breathingPhasesValues?.breathe_in || 4,
        breathe_out: presetProps.breathingPhasesValues?.breathe_out || 4,
        hold_in: presetProps.breathingPhasesValues?.hold_in || 4,
        hold_out: presetProps.breathingPhasesValues?.hold_out || 4,
      },
    });

    const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);
    const volumeRef = useRef(preset.volume);

    const currentAudioRef = useRef<HTMLAudioElement | null>(null);
    const phaseIndexRef = useRef(0);
    const audioCacheRef = useRef<Record<string, HTMLAudioElement>>({});
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const getAudioUrl = (phase: Phase, duration: number) => {
      const actualPhase =
        phase === "hold_in" || phase === "hold_out" ? "hold" : phase;
      return `/audio/${actualPhase}_${duration}.mp3`;
    };

    const preloadAudios = () => {
      const newCache: Record<string, HTMLAudioElement> = {};
      PHASES.forEach((phase) => {
        const duration = preset.breathingPhasesValues
          ? preset.breathingPhasesValues[phase]
          : 4;
        const url = getAudioUrl(phase, duration);
        const audio = new Audio(url);
        audio.preload = "auto";
        newCache[`${phase}_${duration}`] = audio;
      });
      audioCacheRef.current = newCache;
    };

    const playNextPhase = () => {
      const phase = PHASES[phaseIndexRef.current];
      const duration = preset.breathingPhasesValues
        ? preset.breathingPhasesValues[phase]
        : 4;
      const key = `${phase}_${duration}`;
      const cachedAudio = audioCacheRef.current[key];

      if (!cachedAudio) {
        console.error("Audio not found in cache:", key);
        return;
      }

      const audio = cachedAudio.cloneNode(true) as HTMLAudioElement;
      audio.volume = volumeRef.current;
      audio.currentTime = 0;

      currentAudioRef.current = audio;
      setCurrentPhase(phase);

      audio.play().catch((err) => {
        console.error("Errore durante la riproduzione audio:", err);
      });

      // Imposta un timeout per passare alla prossima fase
      timeoutRef.current = setTimeout(() => {
        phaseIndexRef.current = (phaseIndexRef.current + 1) % PHASES.length;
        playNextPhase();
      }, duration * 1000);
    };

    useEffect(() => {
      volumeRef.current = preset.volume;
      if (currentAudioRef.current) {
        currentAudioRef.current.volume = preset.volume;
      }
    }, [preset.volume]);

    const play = () => {
      if (preset.enabled) {
        pause();
        preloadAudios();
        phaseIndexRef.current = 0;
        playNextPhase();
      }
    };

    const pause = () => {
      currentAudioRef.current?.pause();
      currentAudioRef.current = null;
      setCurrentPhase(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    useImperativeHandle(ref, () => ({
      play,
      pause,
      getPreset: () => preset,
    }));

    const getScaleForPhase = (phase: Phase | null) => {
      switch (phase) {
        case "breathe_in":
        case "hold_in":
          return 1.5;
        case "breathe_out":
        case "hold_out":
        default:
          return 1;
      }
    };

    useEffect(() => {
      if (preset.enabled && isPlaying) {
        play();
      } else {
        pause();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preset.enabled, isPlaying]);

    const isPresetUpdate = useRef(false);

    useEffect(() => {
      isPresetUpdate.current = true;
      setPreset((prev) => {
        return {
          ...prev,
          volume: presetProps.volume,
          enabled: presetProps.enabled,
          breathingPhasesValues: {
            breathe_in: presetProps.breathingPhasesValues?.breathe_in || 4,
            breathe_out: presetProps.breathingPhasesValues?.breathe_out || 4,
            hold_in: presetProps.breathingPhasesValues?.hold_in || 4,
            hold_out: presetProps.breathingPhasesValues?.hold_out || 4,
          },
        };
      });
    }, [presetProps]);

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
          <CardTitle className="text-center">Guided Breathing</CardTitle>
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
        <CardContent>
          <div className="space-y-6 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              {PHASES.map((phase) => (
                <div key={phase} className="space-y-2">
                  <label className="capitalize block text-sm font-medium">
                    {phase.replace("-", " ")}
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={
                      preset.breathingPhasesValues
                        ? preset.breathingPhasesValues[phase]
                        : 4
                    }
                    onChange={(e) => {
                      const updatedValue = Math.min(
                        10,
                        Math.max(1, Number(e.target.value))
                      );
                      setPreset(
                        (prev) =>
                          ({
                            ...prev,
                            breathingPhasesValues: {
                              ...prev.breathingPhasesValues,
                              [phase]: updatedValue,
                            },
                          } as PresetValues)
                      );
                    }}
                  />
                </div>
              ))}

              <div className="space-y-2 col-span-2">
                <label className="block text-sm font-medium">Volume</label>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={[preset.volume]}
                  onValueChange={(val) => {
                    setPreset((prev) => {
                      return {
                        ...prev,
                        volume: val[0],
                      };
                    });
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="relative h-60 flex items-center justify-center">
              <motion.div
                className="rounded-full bg-primary w-40 h-40"
                animate={{ scale: getScaleForPhase(currentPhase) }}
                transition={{
                  duration: preset.breathingPhasesValues
                    ? preset.breathingPhasesValues[currentPhase as Phase]
                    : 0.5,
                  ease: "easeInOut",
                }}
              />
              {currentPhase && (
                <div className="absolute text-white font-semibold text-xl capitalize">
                  {currentPhase.replace("-", " ")}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

BreathingPlayer.displayName = "BreathingPlayer";

export default BreathingPlayer;
