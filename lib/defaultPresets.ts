import { Preset } from "@/db/schema";

export const defaultPresets: Preset[] = [
  {
    name: "Mental Relaxation",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-10hz.mp3"
    },
    brown_noises: {
        volume: 0.2,
        enabled: true,
        trackSrc: "/magic-deep-noise-for-lucid-dreaming.mp3"
    },
    ambience_sounds: {
        volume: 0.5,
        enabled: false,
        trackSrc: "/gentle-rain.mp3"
    },
    guided_breathing: {
        volume: 0.5,
        enabled: false,
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
    name: "4s Box Breathing",
    isochronic_tones: {
        volume: 0.5,
        enabled: false,
        trackSrc: "/isochronic-8hz.mp3"
    },
    brown_noises: {
        volume: 0.5,
        enabled: false,
        trackSrc: "/relaxing-layered-brown-noise.mp3"
    },
    ambience_sounds: {
        volume: 0.2,
        enabled: true,
        trackSrc: "/forest-sounds.mp3"
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
    name: "Deep Focus",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-12hz.mp3"
    },
    brown_noises: {
        volume: 0.2,
        enabled: true,
        trackSrc: "/soft-brown-noise.mp3"
    },
    ambience_sounds: {
        volume: 0.2,
        enabled: false,
        trackSrc: "/underwater-ambience.mp3"
    },
    guided_breathing: {
        volume: 0.85,
        enabled: true,
        breathingPhasesValues: {
            breathe_in: 5,
            hold_in: 1,
            breathe_out: 7,
            hold_out: 1,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-17T00:00:00.000Z"),
    id: "preset-deep-focus"
  },
  {
    name: "ADHD Relief",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/ADHD-relief.mp3"
    },
    brown_noises: {
        volume: 0.3,
        enabled: false,
        trackSrc: "/relaxing-smoothed-brown-noise.mp3"
    },
    ambience_sounds: {
        volume: 0.3,
        enabled: false,
        trackSrc: "/nature-ambience.mp3"
    },
    guided_breathing: {
        volume: 0.3,
        enabled: true,
        breathingPhasesValues: {
            breathe_in: 3,
            hold_in: 2,
            breathe_out: 4,
            hold_out: 1,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-17T00:00:00.000Z"),
    id: "preset-adhd-relief"
  },
  {
    name: "Lucid Dreaming",
    isochronic_tones: {
        volume: 1,
        enabled: true,
        trackSrc: "/isochronic-8hz.mp3"
    },
    brown_noises: {
        volume: 0.45,
        enabled: true,
        trackSrc: "/magic-deep-noise-for-lucid-dreaming.mp3"
    },
    ambience_sounds: {
        volume: 0.5,
        enabled: true,
        trackSrc: "/night-ambience.mp3"
    },
    guided_breathing: {
        volume: 0.3,
        enabled: false,
        breathingPhasesValues: {
            breathe_in: 4,
            hold_in: 6,
            breathe_out: 8,
            hold_out: 2,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-17T00:00:00.000Z"),
    id: "preset-lucid-dreaming"
  },
  {
    name: "Sensory Calm",
    isochronic_tones: {
        volume: 0.2,
        enabled: false,
        trackSrc: "/isochronic-10hz.mp3"
    },
    brown_noises: {
        volume: 0.3,
        enabled: true,
        trackSrc: "/soothing-brown-noise-with-asmr-crinkles.mp3"
    },
    ambience_sounds: {
        volume: 0.2,
        enabled: true,
        trackSrc: "/gentle-rain.mp3"
    },
    guided_breathing: {
        volume: 1,
        enabled: true,
        breathingPhasesValues: {
            breathe_in: 6,
            hold_in: 2,
            breathe_out: 6,
            hold_out: 2,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-17T00:00:00.000Z"),
    id: "preset-sensory-calm"
  },
    {
    name: "Restful Sleep",
    isochronic_tones: {
        volume: 0.5,
        enabled: true,
        trackSrc: "/isochronic-8hz.mp3"
    },
    brown_noises: {
        volume: 0.35,
        enabled: true,
        trackSrc: "/relaxing-layered-brown-noise.mp3"
    },
    ambience_sounds: {
        volume: 0.3,
        enabled: true,
        trackSrc: "/night-cricket-ambience.mp3"
    },
    guided_breathing: {
        volume: 0.5,
        enabled: false,
        breathingPhasesValues: {
            breathe_in: 4,
            hold_in: 7,
            breathe_out: 8,
            hold_out: 3,
        }
    },
    user_id: "system",
    created_at: new Date("2025-05-17T00:00:00.000Z"),
    id: "preset-restful-sleep"
  }
]
