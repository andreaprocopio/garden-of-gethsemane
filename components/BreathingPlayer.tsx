"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PHASES = ["breathe-in", "hold-in", "breathe-out", "hold-out"] as const;
type Phase = (typeof PHASES)[number];

export default function BreathingPlayer() {
  const [durations, setDurations] = useState<Record<Phase, number>>({
    "breathe-in": 4,
    "hold-in": 4,
    "breathe-out": 4,
    "hold-out": 4,
  });

  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);
  const [volume, setVolume] = useState(1);
  const volumeRef = useRef(volume);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const phaseIndexRef = useRef(0);
  const audioCacheRef = useRef<Record<string, HTMLAudioElement>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioUrl = (phase: Phase, duration: number) => {
    const actualPhase =
      phase === "hold-in" || phase === "hold-out" ? "hold" : phase;
    return `/audio/${actualPhase}-${duration}.mp3`;
  };

  const preloadAudios = () => {
    const newCache: Record<string, HTMLAudioElement> = {};
    PHASES.forEach((phase) => {
      const duration = durations[phase];
      const url = getAudioUrl(phase, duration);
      const audio = new Audio(url);
      audio.preload = "auto";
      newCache[`${phase}-${duration}`] = audio;
    });
    audioCacheRef.current = newCache;
  };

  const playNextPhase = () => {
    const phase = PHASES[phaseIndexRef.current];
    const duration = durations[phase];
    const key = `${phase}-${duration}`;
    const cachedAudio = audioCacheRef.current[key];

    if (!cachedAudio) {
      console.error("Audio non trovato nella cache:", key);
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
    volumeRef.current = volume;
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = volume;
    }
  }, [volume]);

  const start = () => {
    if (isPlaying) return;
    preloadAudios();
    setIsPlaying(true);
    phaseIndexRef.current = 0;
    playNextPhase();
  };

  const stop = () => {
    setIsPlaying(false);
    currentAudioRef.current?.pause();
    currentAudioRef.current = null;
    setCurrentPhase(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const getScaleForPhase = (phase: Phase | null) => {
    switch (phase) {
      case "breathe-in":
      case "hold-in":
        return 1.5;
      case "breathe-out":
      case "hold-out":
      default:
        return 1;
    }
  };

  return (
    <Card className="w-full max-w-xs md:w-fit md:min-w-md md:max-w-2xl px-4 py-8">
      <CardHeader>
        <CardTitle className="text-center">Guided Breathing</CardTitle>
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
                  value={durations[phase]}
                  onChange={(e) =>
                    setDurations((prev) => {
                      const updated = {
                        ...prev,
                        [phase]: Math.min(
                          10,
                          Math.max(1, Number(e.target.value))
                        ),
                      };
                      return updated;
                    })
                  }
                />
              </div>
            ))}

            <div className="space-y-2 col-span-1">
              <label className="block text-sm font-medium">Volume</label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={(val) => setVolume(val[0])}
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={isPlaying ? stop : start}
                variant={isPlaying ? "destructive" : "default"}
                className="w-full"
              >
                {isPlaying ? "Stop" : "Start"}
              </Button>
            </div>
          </div>

          <div className="relative h-60 flex items-center justify-center">
            <motion.div
              className="rounded-full bg-primary w-40 h-40"
              animate={{ scale: getScaleForPhase(currentPhase) }}
              transition={{
                duration: durations[currentPhase as Phase] || 0.5,
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
