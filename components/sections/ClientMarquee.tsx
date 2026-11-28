import Image from "next/image";
import { site } from "@/content/site";

/** Slow infinite marquee. Names in mono until logo files are added (then monochrome logos at 50%). */
export default function ClientMarquee() {
  const row = site.clients;
  return (
    <section aria-label="Clients" className="border-y border-muted/60 py-8 overflow-hidden">
      <ul className="sr-only">{row.map((c) => <li key={c.name}>{c.name}</li>)}</ul>
      <div aria-hidden="true" className="flex w-max motion-safe:animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((c) => (
              <span key={c.name + k} className="flex items-center px-10 opacity-50">
                {c.logo ? (
                  <Image src={c.logo} alt="" width={140} height={36} className="h-8 w-auto [filter:brightness(0)_invert(1)]" />
                ) : (
                  <span className="font-display text-[22px] tracking-[-0.02em] whitespace-nowrap">{c.name}</span>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
