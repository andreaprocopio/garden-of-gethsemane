import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ColoredBorderButtonProps {
  text: string;
  href: string;
  from?: string;
  via?: string;
  to?: string;
  hasIcon?: boolean;
}

const ColoredBorderButton = ({
  text,
  href,
  from = "emerald-500/0",
  to = "emerald-500/0",
  via = "emerald-500/90",
  hasIcon = false,
}: ColoredBorderButtonProps) => {
  return (
    <Link href={href}>
      <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6 text-white inline-block whitespace-nowrap">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(72,218,241,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-5 ring-1 ring-white/10">
          <span>{text}</span>
          {hasIcon && (
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </div>
        <span
          className={cn(
            "absolute -bottom-0 left-[1.25rem] h-px w-[calc(100%-2.5rem)] bg-gradient-to-r transition-opacity duration-500 group-hover:opacity-40",
            `from-${from}`,
            `to-${to}`,
            `via-${via}`
          )}
        />
      </button>
    </Link>
  );
};

export default ColoredBorderButton;
