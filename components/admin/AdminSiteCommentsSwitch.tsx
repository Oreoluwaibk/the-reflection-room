"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  setSiteCommentsEnabled,
  type ContentActionResult,
} from "@/app/actions/content";

type Props = {
  enabled: boolean;
};

export function AdminSiteCommentsSwitch({ enabled }: Props) {
  const router = useRouter();
  const [isOn, setIsOn] = useState(enabled);
  const [feedback, setFeedback] = useState<ContentActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const next = !isOn;
    setFeedback(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("enabled", next ? "true" : "false");
      const result = await setSiteCommentsEnabled(formData);
      setFeedback(result);
      if (result.ok) {
        setIsOn(next);
        router.refresh();
      }
    });
  }

  return (
    <div className="rounded-xl border border-sage-soft/80 bg-sage-mist/40 px-5 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-serif text-xl text-forest">Comments on the site</p>
          <p className="mt-1 max-w-md text-sm text-forest/65">
            Master switch. When off, the comment section is hidden on every
            reflection and book page. When on, each page still follows its own
            comments setting.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-label="Show comments on the website"
          disabled={isPending}
          onClick={handleToggle}
          className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition disabled:opacity-60 ${
            isOn ? "bg-sage-deep" : "bg-forest/25"
          }`}
        >
          <span
            className={`inline-block size-6 rounded-full bg-cream shadow transition ${
              isOn ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <p className="mt-3 text-xs font-medium tracking-wide text-forest/55 uppercase">
        {isPending ? "Updating…" : isOn ? "Currently on" : "Currently off"}
      </p>

      {feedback ? (
        <p
          className={`mt-2 text-sm ${feedback.ok ? "text-sage-deep" : "text-terracotta-deep"}`}
          role="status"
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}
