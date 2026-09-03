"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandMark } from "@/components/BrandMark";
import { ReflectingRoomTrigger } from "@/components/ReflectingRoomTrigger";
import { IconClose, IconMenu } from "@/components/icons";
import { navLinks, site } from "@/lib/site";

function isComingSoon(
  link: (typeof navLinks)[number],
): link is (typeof navLinks)[number] & { comingSoon: true } {
  return "comingSoon" in link && link.comingSoon === true;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const drawer =
    mounted &&
    createPortal(
      <div className="lg:hidden" aria-hidden={!open}>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          className={`fixed inset-0 z-[60] bg-forest/45 transition-opacity duration-300 ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <aside
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`fixed inset-y-0 right-0 z-[70] flex h-dvh w-[min(20rem,88vw)] flex-col bg-cream shadow-[-12px_0_40px_-20px_rgba(44,58,43,0.45)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-sage-soft/70 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/logo-ia.png"
                alt=""
                width={32}
                height={32}
                className="object-contain"
                aria-hidden
              />
              <div>
                <p className="font-serif text-lg leading-none text-forest">
                  Menu
                </p>
                <p className="mt-1 text-[0.65rem] tracking-[0.22em] text-sage-deep uppercase">
                  Pause Think Grow
                </p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-forest transition hover:bg-sage-mist"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active =
                  !isComingSoon(link) &&
                  (link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href));

                const className = `block w-full rounded-lg px-4 py-3.5 text-left text-base tracking-wide transition ${
                  active
                    ? "bg-sage-mist text-terracotta"
                    : "text-forest hover:bg-sage-mist/60"
                }`;

                return (
                  <li key={link.href}>
                    {isComingSoon(link) ? (
                      <ReflectingRoomTrigger
                        className={className}
                        onAfterOpen={() => setOpen(false)}
                      >
                        {link.label}
                      </ReflectingRoomTrigger>
                    ) : (
                      <Link
                        href={link.href}
                        tabIndex={open ? 0 : -1}
                        className={className}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                        {active ? (
                          <span className="mt-1 block h-px w-8 bg-terracotta" />
                        ) : null}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-sage-soft/70 px-5 py-5">
            <Image
              src="/brand/signature.png"
              alt={site.name}
              width={140}
              height={44}
              className="h-auto w-auto object-contain object-left"
              style={{ width: "auto", height: "auto", maxWidth: 140 }}
            />
            <p className="mt-2 text-xs tracking-wide text-forest/60">
              {site.taglineSpoken}
            </p>
          </div>
        </aside>
      </div>,
      document.body,
    );

  return (
    <header className="sticky top-0 z-50 border-b border-sage-soft/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <BrandMark size="sm" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active =
              !isComingSoon(link) &&
              (link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href));

            const className = `relative px-2.5 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${
              active ? "text-terracotta" : "text-forest/80 hover:text-forest"
            }`;

            if (isComingSoon(link)) {
              return (
                <ReflectingRoomTrigger key={link.href} className={className}>
                  {link.label}
                </ReflectingRoomTrigger>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
                <span
                  className={`absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-terracotta transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-forest lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen(true)}
        >
          <IconMenu className="h-6 w-6" />
        </button>
      </div>

      {drawer}
    </header>
  );
}
