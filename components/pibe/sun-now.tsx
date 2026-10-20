"use client";

import { useEffect, useState } from "react";
import { SunIcon } from "@phosphor-icons/react";
import { sunSite } from "@/lib/pibe";
import { hhmm, sunState, type SunState } from "@/lib/sun";

/**
 * El sol de Buenos Aires ahora: su altura, la salida y la puesta de hoy. Se calcula en el
 * navegador (el servidor no sabe la hora de quien mira) y se actualiza una vez por minuto.
 */
export function SunNow({ className = "" }: { className?: string }) {
  const [sun, setSun] = useState<SunState | null>(null);

  useEffect(() => {
    const tick = () => setSun(sunState(new Date(), sunSite.lat, sunSite.lon, sunSite.utcOffset));
    const first = window.setTimeout(tick, 50);
    const iv = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(iv);
    };
  }, []);

  const up = sun ? sun.progress >= 0 && sun.progress <= 1 && sun.elevation > -0.5 : false;

  return (
    <p className={`pa-sun-now ${className}`} aria-live="off">
      <SunIcon size={18} weight="fill" className="pa-sun-now-icon" aria-hidden="true" />
      <span className="pa-num font-semibold text-[var(--pa-on-dark)]">
        {sun ? (up ? `Sol a ${Math.max(0, Math.round(sun.elevation))}°` : `Amanece ${hhmm(sun.sunrise)}`) : "Sol de hoy"}
      </span>
      <span className="pa-num">{sun ? `${hhmm(sun.sunrise)} a ${hhmm(sun.sunset)}` : "--:-- a --:--"}</span>
      <span>{sunSite.name}, ahora</span>
    </p>
  );
}
