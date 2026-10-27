"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackConversion, type Conversion } from "@/lib/track";

/** Un enlace común que, al tocarlo, cuenta la consulta (lib/track.ts). */
export function TrackedLink({
  event,
  from,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: Conversion; from: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackConversion(event, { desde: from });
        onClick?.(e);
      }}
    />
  );
}
