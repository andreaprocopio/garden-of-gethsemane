import { DefaultPresets } from "./types";

export const defaultPresets: DefaultPresets = [
  {
    name: "Base preset",
    presetValues: {
        "isochronic-tones": {
            volume: 1,
            enabled: true
        },
        "brown-noise": {
            volume: 0.2,
            enabled: true
        },
        "ambience-sounds": {
            volume: 0.1,
            enabled: true
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
            enabled: true
        },
        "brown-noise": {
            volume: 0.2,
            enabled: false
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
