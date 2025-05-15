export type PresetValues = {
  volume: number;
  enabled: boolean;
  trackSrc?: string;
}

export type Preset = {
  "isochronic-tones": PresetValues
  "brown-noise": PresetValues
  "ambience-sounds": PresetValues
  "guided-breathing": PresetValues
}

export type DefaultPreset = {
  name: string;
  presetValues: Preset
}

export type DefaultPresets = DefaultPreset[]
