import { Preset } from "@/db/schema";

export const defaultPresets: Preset[] = [
  {
    name: "Base Preset",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-10hz.mp3"
    },
    brown_noises: {
        volume: 0.2,
        enabled: true,
        trackSrc: "/relaxing-layered-brown-noise.mp3"
    },
    ambience_sounds: {
        volume: 0.1,
        enabled: true,
        trackSrc: "/gentle-rain.mp3"
    },
    guided_breathing: {
        volume: 0.5,
        enabled: false
    },
    user_id: "system",
    created_at: new Date("2025-05-15T00:00:00.000Z"),
    id: "base-preset-001"
  },
  {
    name: "4s Box Breathing",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-8hz.mp3"
    },
    brown_noises: {
        volume: 0.2,
        enabled: false,
    },
    ambience_sounds: {
        volume: 0.1,
        enabled: false,
    },
    guided_breathing: {
        volume: 0.5,
        enabled: true,
        breathingPhasesValues: {
            breathe_in: 4,
            hold_in: 4,
            breathe_out: 4,
            hold_out: 4,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-15T00:00:00.000Z"),
    id: "base-preset-001"
  },
  {
    name: "6s Box Breathing",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-8hz.mp3"
    },
    brown_noises: {
        volume: 0.2,
        enabled: false,
    },
    ambience_sounds: {
        volume: 0.1,
        enabled: false,
    },
    guided_breathing: {
        volume: 0.5,
        enabled: true,
        breathingPhasesValues: {
            breathe_in: 6,
            hold_in: 6,
            breathe_out: 6,
            hold_out: 6,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-15T00:00:00.000Z"),
    id: "base-preset-001"
  },
]
