// src/components/ui/PreviewButton.tsx
import React, { useRef, useCallback } from "react";
import { Button } from "./button";
import type { Props as ButtonProps } from "./button";

type Placement = "top" | "bottom" | "left" | "right";

export interface PreviewButtonProps
  extends Omit<ButtonProps, "asChild" | "onMouseEnter" | "onMouseLeave"> {
  videoSrc: string;
  popPlacement?: Placement;
  // width/height now controlled by Tailwind below; you can expose props later if you want
  videoClassName?: string;
}

export default function PreviewButton({
  children,
  videoSrc,
  popPlacement = "top",
  videoClassName = "",
  className = "",
  ...buttonProps
}: PreviewButtonProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = true;     // required for autoplay policies
      v.load();           // ensure dimensions/metadata
      v.currentTime = 0;
      void v.play();
    } catch {}
  }, []);

  const handleLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  }, []);

  const pos =
    popPlacement === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-3"
      : popPlacement === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-3"
      : popPlacement === "left"
      ? "right-full top-1/2 -translate-y-1/2 mr-3"
      : "left-full top-1/2 -translate-y-1/2 ml-3";

  return (
  <div
    className="relative inline-block group"
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
  >
    <Button className={className} {...buttonProps}>
      {children}
    </Button>

    {/* Floating preview (video or fallback) */}
    <div
      className={`pointer-events-none absolute z-50 ${pos} opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition duration-200`}
    >
      <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-black/10 bg-black/80 backdrop-blur w-[420px] aspect-video flex items-center justify-center text-white text-sm font-medium">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="auto"
            className={`pointer-events-none w-full h-full object-cover ${videoClassName}`}
            onCanPlay={() => {
              try {
                const v = videoRef.current;
                if (!v) return;
                if (!v.paused) return;
                v.muted = true;
                void v.play();
              } catch {}
            }}
          />
        ) : (
          <span className="text-3xl opacity-90">Coming soon</span>
        )}
      </div>
    </div>
  </div>
);

}
