"use client";
import React, { useState, useRef, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ColoredBorderButton from "../ColoredBorderButton";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { SignedIn, UserButton } from "@clerk/nextjs";

export const FloatingNav = ({
  navItems,
  className,
  isLoggedIn,
  isLanding,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  isLoggedIn: boolean;
  isLanding: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ctaContent =
    isLoggedIn && !isLanding ? (
      <ColoredBorderButton text="Garden" href="/garden" hasIcon />
    ) : isLoggedIn ? (
      <ColoredBorderButton text="Enter the garden" href="/garden" hasIcon />
    ) : (
      <>
        <ColoredBorderButton
          text="Login"
          href="/sign-in"
          from="transparent"
          via="indigo-400"
          to="transparent"
        />
        <ColoredBorderButton
          text="Sign up"
          href="/sign-up"
          from="transparent"
          via="indigo-400"
          to="transparent"
        />
      </>
    );

  const userButton = isLoggedIn ? (
    <SignedIn>
      <UserButton />
    </SignedIn>
  ) : null;

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 mx-auto z-[5000] flex items-center justify-center gap-4",
        className
      )}
      ref={navRef}
    >
      <motion.div
        initial={{ width: 52 }}
        animate={{ width: expanded ? "auto" : 52 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "min-w-[52px] overflow-hidden flex items-center rounded-full border dark:border-white/[0.2] dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] px-2 py-2 space-x-4 cursor-pointer whitespace-nowrap",
          !expanded && "!py-0 !px-0 !border-0"
        )}
        onClick={() => setExpanded((prev) => !prev)}
        onMouseEnter={!isMobile ? () => setExpanded(true) : undefined}
        onMouseLeave={!isMobile ? () => setExpanded(false) : undefined}
      >
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center space-x-4 whitespace-nowrap"
            >
              {ctaContent}
              {navItems.map((navItem, idx) => (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className="dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 whitespace-nowrap"
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block text-sm">
                    {navItem.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-[52px] h-[52px] rounded-full overflow-hidden flex items-center justify-center mx-auto"
          >
            <Image
              src="/garden-of-gethsemane.png"
              alt="Garden Icon"
              width={35}
              height={35}
              className="rounded-full"
            />
          </motion.div>
        )}
      </motion.div>
      {userButton}
    </div>
  );
};
