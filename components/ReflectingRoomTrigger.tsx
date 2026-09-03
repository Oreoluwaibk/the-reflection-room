"use client";

import { useComingSoon } from "@/components/ComingSoonModal";
import { site } from "@/lib/site";

type ReflectingRoomTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onAfterOpen?: () => void;
};

export function ReflectingRoomTrigger({
  children,
  className = "",
  onAfterOpen,
}: ReflectingRoomTriggerProps) {
  const { openComingSoon } = useComingSoon();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        openComingSoon(site.reflectingRoom);
        onAfterOpen?.();
      }}
    >
      {children}
    </button>
  );
}
