"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AudioPlayerHandle } from "./AudioPlayer";
import { BreathingPlayerHandle } from "./BreathingPlayer";
import { toast } from "sonner";

import { Preset } from "@/db/schema";
import { savePreset } from "@/lib/actions/savePreset";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface SavePresetButtonProps {
  playerRefs: React.RefObject<AudioPlayerHandle | null>[];
  breathingRef: React.RefObject<BreathingPlayerHandle | null>;
  selectedPreset: Preset;
  onSaved: (updatedPreset: Preset) => void;
}

const SavePresetButton: React.FC<SavePresetButtonProps> = ({
  playerRefs,
  breathingRef,
  selectedPreset,
  onSaved,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!name.trim()) {
      setError("Il nome del preset è obbligatorio.");
      return;
    }
    setError("");

    if (loading) return;

    const updatedPreset: Preset = {
      ...selectedPreset,
      name: name.trim(),
      isochronic_tones: playerRefs[0].current?.getPreset(),
      brown_noises: playerRefs[1].current?.getPreset(),
      ambience_sounds: playerRefs[2].current?.getPreset(),
      guided_breathing: breathingRef.current?.getPreset(),
    };

    setLoading(true);
    let result;
    try {
      result = await savePreset(updatedPreset);
      if (!result.success) {
        throw new Error(result.error);
      }
      toast.success("Preset saved succesfully!");
      onSaved(updatedPreset);
    } catch (err) {
      console.error("Error during preset save:", err);
      toast.error("An error occurred. Try again.");
      setError(typeof err === "string" ? err : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="my-4">
        <Button>Save as new preset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save as new preset</DialogTitle>
          <DialogDescription>Insert a name for preset:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Insert a name for preset"
              className="col-span-3"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 col-span-4 px-4 -mt-2">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleClick} disabled={!name.trim() || loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavePresetButton;
