import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { Sound } from "@/db/schema";
import { soundsTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import MainControl from "@/components/MainControl";

const GardenInitializer = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const sounds: Sound[] = await db
    .select()
    .from(soundsTable)
    .orderBy(asc(soundsTable.created_at));

  const isochronicTones = sounds.filter(
    (sound) => sound.sound_type === "ISOCHORNIC_TONES"
  );
  const brownNoises = sounds.filter(
    (sound) => sound.sound_type === "BROWN_NOISES"
  );
  const ambienceSounds = sounds.filter(
    (sound) => sound.sound_type === "AMBIENCE_SOUNDS"
  );

  return (
    <div className="grow flex flex-col items-center justify-center py-20">
      <MainControl
        isochronicTones={isochronicTones}
        brownNoises={brownNoises}
        ambienceSounds={ambienceSounds}
      />
    </div>
  );
};

export default GardenInitializer;
