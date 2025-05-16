"use server";

import { db } from "@/db";
import { presetsTable, Preset } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const savePreset = async (preset: Preset) => {
  try {

    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const {
      name,
      isochronic_tones,
      brown_noises,
      ambience_sounds,
      guided_breathing,
    } = preset;

    await db.insert(presetsTable).values({
      user_id: user.id,
      name,
      isochronic_tones,
      brown_noises,
      ambience_sounds,
      guided_breathing,
    });

    revalidatePath("/garden");

    return { success: true };
  } catch (error) {
    console.error("Save preset error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error during preset saving",
    };
  }
};
