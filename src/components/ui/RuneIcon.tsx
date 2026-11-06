import type { ReactNode } from "react";
import type { RuneVariant } from "../../data/types";

const RUNES: Record<RuneVariant, ReactNode> = {
  fire: (
    <g>
      <path
        d="M32 11c5 8 12 13 12 23a12 12 0 0 1-24 0c0-6 4-10 7-15 1 4 3 6 5 8 0-5 0-10 0-16Z"
        fill="currentColor"
        fillOpacity=".1"
      />
      <path d="M32 27c3 4 6 7 6 11a6 6 0 0 1-12 0c0-3 2-5 4-8 0 2 1 3 2 4 0-3 0-5 0-7Z" />
    </g>
  ),
  ice: (
    <g>
      <path d="M32 10v44M12 21l40 22M52 21 12 43" />
      <path d="m27 14 5 4 5-4M27 50l5-4 5 4M15 27l5-1 1-5M49 39l-5 1-1 5M49 25l-5-1-1-5M15 39l5 1 1 5" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </g>
  ),
  lightning: (
    <g>
      <path
        d="M36 7 20 35h10l-4 22 18-29H33l3-21Z"
        fill="currentColor"
        fillOpacity=".12"
      />
      <path d="M24 25h9M22 32h8" opacity=".5" />
    </g>
  ),
  holy: (
    <g>
      <circle cx="32" cy="32" r="11" fill="currentColor" fillOpacity=".08" />
      <path d="M32 6v9M32 49v9M6 32h9M49 32h9M13.6 13.6l6.4 6.4M44 44l6.4 6.4M50.4 13.6 44 20M20 44l-6.4 6.4" />
      <path d="m32 24 3 5 6 3-6 3-3 5-3-5-6-3 6-3 3-5Z" />
    </g>
  ),
  blood: (
    <g>
      <path
        d="M32 9c8 11 15 19 15 27a15 15 0 0 1-30 0c0-8 7-16 15-27Z"
        fill="currentColor"
        fillOpacity=".12"
      />
      <path d="M25 37c0 4 3 7 7 7" opacity=".7" />
    </g>
  ),
  ender: (
    <g>
      <path d="M8 32c7-11 15-16 24-16s17 5 24 16c-7 11-15 16-24 16S15 43 8 32Z" />
      <ellipse cx="32" cy="32" rx="5" ry="11" fill="currentColor" fillOpacity=".2" />
      <path d="M32 23v18" />
      <circle cx="32" cy="32" r="28" strokeDasharray="2 7" opacity=".4" />
    </g>
  ),
  evocation: (
    <g>
      <path d="m32 8 5 19 19 5-19 5-5 19-5-19-19-5 19-5 5-19Z" fill="currentColor" fillOpacity=".08" />
      <path d="m49 12 3 3-3 3-3-3 3-3ZM15 46l3 3-3 3-3-3 3-3Z" />
      <circle cx="32" cy="32" r="4" />
    </g>
  ),
  nature: (
    <g>
      <path
        d="M48 13C30 13 17 22 17 36c0 9 7 15 15 15 14 0 20-16 16-38Z"
        fill="currentColor"
        fillOpacity=".1"
      />
      <path d="M18 50c5-13 13-21 26-27M29 37l-1-8M36 30l-1-8M24 44l8 0" />
    </g>
  ),
  eldritch: (
    <g>
      <path d="M13 30c5-8 12-12 19-12s14 4 19 12c-5 8-12 12-19 12s-14-4-19-12Z" />
      <circle cx="32" cy="30" r="4" fill="currentColor" />
      <path d="M20 42c2 5 2 9 0 13M32 42c0 6 2 9 5 12M44 42c-2 5-2 9 0 13" opacity=".8" />
      <path d="M24 18c0-4 2-7 5-9M40 18c0-4-2-7-5-9" opacity=".5" />
    </g>
  ),
  necro: (
    <g>
      <path d="M20 26a12 12 0 0 1 24 0v6l-3 4v8H23v-8l-3-4v-6Z" fill="currentColor" fillOpacity=".08" />
      <circle cx="27" cy="28" r="3" fill="currentColor" />
      <circle cx="37" cy="28" r="3" fill="currentColor" />
      <path d="M29 38h6M26 44v6M32 44v6M38 44v6" />
    </g>
  ),
  deep: (
    <g>
      <path d="M32 9c12 0 22 10 22 22S44 53 32 53 10 44 10 32 20 9 32 9Z" strokeDasharray="3 5" opacity=".5" />
      <path d="M32 18c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14Z" />
      <path d="M32 26c3 0 6 3 6 6s-3 6-6 6-6-3-6-6 3-6 6-6Z" fill="currentColor" fillOpacity=".2" />
      <path d="M32 32c6-3 12-2 17 3M32 32c-6 3-12 2-17-3M32 32c3 6 2 12-3 17M32 32c-3-6-2-12 3-17" opacity=".7" />
    </g>
  ),
  void: (
    <g>
      <path d="M32 8c13 0 24 11 24 24S45 56 32 56 8 45 8 32 19 8 32 8Z" strokeDasharray="2 6" opacity=".5" />
      <path d="M50 32c0 10-8 18-18 18S14 42 14 32s8-18 18-18c6 0 11 3 14 7-3-2-6-3-10-3-8 0-14 6-14 14s6 14 14 14c7 0 13-5 14-12-2 5-6 8-11 8-6 0-10-4-10-10s4-10 10-10c4 0 7 2 9 5" />
      <path d="m45 13 1.5 3.5L50 18l-3.5 1.5L45 23l-1.5-3.5L40 18l3.5-1.5L45 13Z" fill="currentColor" />
    </g>
  ),
  arcane: (
    <g>
      <path d="M32 8 53 20v24L32 56 11 44V20L32 8Z" fill="currentColor" fillOpacity=".07" />
      <path d="m32 18 13 22H19l13-22Z" />
      <circle cx="32" cy="33" r="4" fill="currentColor" />
      <path d="M32 12v6M32 46v6M16 24l5 3M43 37l5 3M48 24l-5 3M21 37l-5 3" opacity=".6" />
    </g>
  ),
  sound: (
    <g>
      <path d="M26 40V22l16-5v18" />
      <ellipse cx="21" cy="42" rx="6" ry="5" fill="currentColor" fillOpacity=".2" />
      <ellipse cx="37" cy="37" rx="6" ry="5" fill="currentColor" fillOpacity=".2" />
      <path d="M47 20c4 4 6 8 6 12s-2 8-6 12M52 14c6 6 8 12 8 18s-2 12-8 18" opacity=".6" />
    </g>
  ),
  boss: (
    <g>
      <path d="m14 22 9 7 9-13 9 13 9-7-4 24H18l-4-24Z" fill="currentColor" fillOpacity=".1" />
      <path d="M24 39h16M24 45h16" opacity=".7" />
      <circle cx="26" cy="32" r="2" fill="currentColor" />
      <circle cx="38" cy="32" r="2" fill="currentColor" />
    </g>
  ),
  eye: (
    <g>
      <path d="M8 32c7-11 15-16 24-16s17 5 24 16c-7 11-15 16-24 16S15 43 8 32Z" />
      <circle cx="32" cy="32" r="7" fill="currentColor" fillOpacity=".2" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <path d="M32 6v7M32 51v7M9 16l6 4M47 44l6 4M55 16l-6 4M17 44l-6 4" opacity=".6" />
    </g>
  ),
  mask: (
    <g>
      <path d="M18 16c8-4 20-4 28 0v16c0 12-6 20-14 24-8-4-14-12-14-24V16Z" fill="currentColor" fillOpacity=".08" />
      <path d="M24 28c2-2 4-2 6 0M34 28c2-2 4-2 6 0M28 40h8" />
      <path d="M18 16c8-4 20-4 28 0" opacity=".5" />
    </g>
  ),
  crown: (
    <g>
      <path d="m12 24 10 8 10-15 10 15 10-8-4 26H16l-4-26Z" fill="currentColor" fillOpacity=".1" />
      <path d="M20 42h24M20 48h24" opacity=".7" />
      <circle cx="32" cy="34" r="3" fill="currentColor" />
    </g>
  ),
};

export function RuneIcon({
  variant,
  size = 48,
  className,
  title,
}: {
  variant: RuneVariant;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="32" r="29" opacity=".35" />
      <circle cx="32" cy="32" r="24" opacity=".2" strokeDasharray="2 5" />
      {RUNES[variant]}
    </svg>
  );
}
