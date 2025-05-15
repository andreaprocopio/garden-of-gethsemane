import { DefaultPresets } from "./types";

export const defaultPresets: DefaultPresets = [
  {
    name: "Base preset",
    presetValues: {
        "isochronic-tones": {
            volume: 1,
            enabled: true,
            trackSrc: "/isochronic-10hz.mp3"
        },
        "brown-noise": {
            volume: 0.2,
            enabled: true,
            trackSrc: "/relaxing-layered-brown-noise.mp3"
        },
        "ambience-sounds": {
            volume: 0.1,
            enabled: true,
            trackSrc: "/gentle-rain.mp3"
        },
        "guided-breathing": {
            volume: 0.5,
            enabled: false
        },
    }
  },
  {
    name: "Breathing preset",
    presetValues: {
        "isochronic-tones": {
            volume: 1,
            enabled: true,
            trackSrc: "/isochronic-8hz.mp3"
        },
        "brown-noise": {
            volume: 0.2,
            enabled: true,
            trackSrc: "/relaxing-smoothed-brown-noise.mp3"
        },
        "ambience-sounds": {
            volume: 0.1,
            enabled: false
        },
        "guided-breathing": {
            volume: 0.6,
            enabled: true
        },
    }
  },
]
