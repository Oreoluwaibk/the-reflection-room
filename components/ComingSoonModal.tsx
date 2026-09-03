"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IconClose } from "@/components/icons";
import { site } from "@/lib/site";

type ComingSoonContextValue = {
  openComingSoon: (feature?: string) => void;
};

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }
  return context;
}

export function ComingSoonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [feature, setFeature] = useState<string>(site.reflectingRoom);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openComingSoon = useCallback((nextFeature?: string) => {
    setFeature(nextFeature ?? site.reflectingRoom);
    setOpen(true);
  }, []);

  const modal =
    mounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-5 transition ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 bg-forest/50 backdrop-blur-[2px]"
          aria-label="Close coming soon dialog"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative w-full max-w-md rounded-2xl border border-sage-soft bg-cream px-7 py-8 text-center shadow-[0_30px_60px_-28px_rgba(44,58,43,0.55)] transition duration-300 ${
            open ? "translate-y-0 scale-100" : "translate-y-3 scale-95"
          }`}
        >
          <button
            type="button"
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-forest/70 transition hover:bg-sage-mist hover:text-forest"
            aria-label="Close"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <IconClose className="h-5 w-5" />
          </button>

          <p className="text-xs font-medium tracking-[0.22em] text-terracotta uppercase">
            Coming Soon
          </p>
          <h2
            id={titleId}
            className="mt-3 font-serif text-3xl leading-tight text-forest"
          >
            {feature}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-forest/75">
            Take a seat — this space is still being prepared. Check back soon
            for thoughtful conversations and honest reflections.
          </p>
          <p className="mt-3 font-serif text-lg italic text-forest/80">
            {site.taglineSpoken}
          </p>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            className="mt-7 inline-flex rounded-md bg-sage px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-sage-deep"
            onClick={() => setOpen(false)}
          >
            Got it
          </button>
        </div>
      </div>,
      document.body,
    );

  return (
    <ComingSoonContext.Provider value={{ openComingSoon }}>
      {children}
      {modal}
    </ComingSoonContext.Provider>
  );
}
