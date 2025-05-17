"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export function LandingHero() {
  return (
    <HeroHighlight className="py-40">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-300 mb-2"
        >
          Welcome to the
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-snug"
        >
          <Highlight className="text-black dark:text-white">
            Garden of Gethsemane
          </Highlight>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-300"
        >
          Find your calm, focus your mind, and enhance your well-being.
        </motion.p>
      </div>
    </HeroHighlight>
  );
}
