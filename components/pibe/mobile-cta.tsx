"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { pibeCta, social } from "@/lib/pibe";

/**
 * Lo que flota al costado derecho: WhatsApp arriba e Instagram abajo, cada uno en el color
 * que la gente ya reconoce, que llevan directo a cada app. En celular, además, la barra con
 * el pedido de visita (la cabecera no tiene lugar para él), con la columna a su derecha.
 * Todo aparece al dejar el hero y se corre al llegar al formulario, que ya tiene los canales.
 */
export function PibeMobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    if (!hero || !contact) return;
    const heroIo = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const contactIo = new IntersectionObserver(
      ([e]) => setAtContact(e.isIntersecting || e.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -25% 0px" },
    );
    heroIo.observe(hero);
    contactIo.observe(contact);
    return () => {
      heroIo.disconnect();
      contactIo.disconnect();
    };
  }, []);

  const shown = pastHero && !atContact;
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <>
      <div className="pa-mobile-cta sm:hidden" data-shown={shown} inert={!shown}>
        <a href={pibeCta.href} className="pa-mobile-cta-main">
          {pibeCta.label}
          <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
        </a>
      </div>

      <ul className="pa-social" data-shown={shown} inert={!shown} aria-label="Escribime o seguime">
        <li>
          <a href={social.whatsapp.href} {...external} className="pa-social-btn pa-social-wa">
            <WhatsappLogoIcon size={28} weight="fill" aria-hidden="true" />
            <span className="pa-social-hint">{social.whatsapp.hint}</span>
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </li>
        <li>
          <a
            href={social.instagram.href}
            {...(social.instagram.missing ? {} : external)}
            className="pa-social-btn pa-social-ig"
          >
            <InstagramLogoIcon size={28} weight="bold" aria-hidden="true" />
            <span className="pa-social-hint">{social.instagram.hint}</span>
            {!social.instagram.missing && <span className="sr-only"> (se abre en otra pestaña)</span>}
          </a>
        </li>
      </ul>
    </>
  );
}
