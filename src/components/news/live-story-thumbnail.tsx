"use client";

import Image from "next/image";
import { useState } from "react";
import { iconPathForCategory, gradientForCategory } from "@/lib/content-visuals";

export function LiveStoryThumbnail({
  src,
  alt,
  category,
  size = "default",
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  src?: string;
  alt: string;
  category?: string;
  size?: "default" | "large";
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(src) && !failed;
  const gradient = gradientForCategory(category ?? alt);
  const iconSize = size === "large" ? "h-16 w-16" : "h-10 w-10";

  return (
    <div className={`relative w-full overflow-hidden bg-pine-950 ${size === "large" ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
      {hasImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
          <div
            className="absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent, transparent 22px, currentColor 22px, currentColor 23px)",
            }}
          />
          <svg
            viewBox="0 0 24 24"
            className={`relative text-gold-300/40 ${iconSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            aria-hidden="true"
          >
            <path d={iconPathForCategory(category ?? alt)} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
