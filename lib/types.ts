export type PresetValues = {
  volume: number;
  enabled: boolean;
  trackSrc?: string;
  breathingPhasesValues?: BreathingPhasesValues
}

export type BreathingPhasesValues = {
  breathe_in: number;
  hold_in: number;
  breathe_out: number;
  hold_out: number;
}
