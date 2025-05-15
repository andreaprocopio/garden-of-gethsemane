import {
  uuid,
  timestamp,
  pgTable,
  varchar,
  text,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export type Sound = InferSelectModel<typeof soundsTable>;

export const SOUND_TYPE_ENUM = pgEnum("sound_type", ["ISOCHORNIC_TONES", "BROWN_NOISES", "AMBIENCE_SOUNDS"]);

export const soundsTable = pgTable("sounds", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  label: varchar({ length: 255 }).notNull(),
  src: text("src").notNull(),
  sound_type: SOUND_TYPE_ENUM().notNull().default("ISOCHORNIC_TONES"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


export type Preset = InferSelectModel<typeof presetsTable>;

export const presetsTable = pgTable("presets", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  user_id: text("user_id").notNull(),
  name: varchar({ length: 255 }).notNull(),
  isochronic_tones: json("isochronic_tones"),
  brown_noises: json("brown_noises"),
  ambience_sounds: json("ambience_sounds"),
  guided_breathing: json("guided_breathing"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
