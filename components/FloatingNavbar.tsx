"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  ArrowUpToLine,
  Leaf,
  CircleHelp,
  Settings2,
  LibraryBig,
  Undo2,
} from "lucide-react";

interface FloatingNavbarProps {
  isLoggedIn: boolean;
  isLanding: boolean;
}

export function FloatingNavbar({ isLoggedIn, isLanding }: FloatingNavbarProps) {
  const navItems = isLanding
    ? [
        {
          name: "Home",
          link: "#",
          icon: (
            <ArrowUpToLine className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
        {
          name: "Features",
          link: "#features",
          icon: <Leaf className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
          name: "Tutorial",
          link: "#tutorial",
          icon: (
            <CircleHelp className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
      ]
    : [
        {
          name: "Templates",
          link: "/templates",
          icon: (
            <Settings2 className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
        {
          name: "Guides",
          link: "/guides",
          icon: (
            <LibraryBig className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
        {
          name: "Landing",
          link: "/?noRedirect=true",
          icon: <Undo2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
      ];

  return (
    <div className="relative  w-full">
      <FloatingNav
        navItems={navItems}
        isLoggedIn={isLoggedIn}
        isLanding={isLanding}
      />
    </div>
  );
}
