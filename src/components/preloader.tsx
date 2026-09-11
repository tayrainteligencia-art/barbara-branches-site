"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMarkPreloaderReady } from "@/lib/preloader-context";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const markReady = useMarkPreloaderReady();
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
        markReady();
      },
    });

    tl.set(iconRef.current, { opacity: 0, scale: 0.85 })
      .to(iconRef.current, { opacity: 1, scale: 1, duration: 0.6 })
      .to(barRef.current, { scaleX: 1, duration: 0.55 }, "<0.05")
      .to(
        rootRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.inOut" },
        "+=0.15",
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [reducedMotion, markReady]);

  if (reducedMotion || !visible) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-surface-dark"
    >
      <div ref={iconRef} className="h-16 w-16">
        <Image
          src="/brand/icon.webp"
          alt=""
          width={64}
          height={64}
          priority
          className="h-full w-full object-contain"
        />
      </div>
      <div className="h-px w-32 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-bronze"
        />
      </div>
    </div>
  );
}
