"use client";

import { useEffect } from "react";
import { useComingSoon } from "@/components/ComingSoonModal";

export function OpenComingSoonOnMount({ feature }: { feature: string }) {
  const { openComingSoon } = useComingSoon();

  useEffect(() => {
    openComingSoon(feature);
  }, [feature, openComingSoon]);

  return null;
}
