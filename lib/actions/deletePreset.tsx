"use server";

import { db } from "@/db";
import { presetsTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const deletePreset = async (presetId: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");

    const preset = await db
      .select()
      .from(presetsTable)
      .where(eq(presetsTable.id, presetId))
      .limit(1);

    const presetRecord = preset[0];

    if (!presetRecord) {
      return { success: false, error: "Preset not found" };
    }

    if (presetRecord.user_id !== user.id) {
      return { success: false, error: "Unauthorized to delete this preset" };
    }

    await db.delete(presetsTable).where(eq(presetsTable.id, presetId));
    revalidatePath("/garden");

    return { success: true };
  } catch (error) {
    console.error("Delete preset error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error during preset deletion",
    };
  }
};
