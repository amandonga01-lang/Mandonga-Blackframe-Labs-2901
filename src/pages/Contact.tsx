import { useState, type FormEvent } from "react";
import { Spotlight, WordReveal } from "../components/motion";
import { CALENDAR_URL, STUDIO_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from "../lib/site";

const NEEDS = ["Podcast", "Talking heads", "Short-form", "Meta AI UGC ads", "SaaS / product", "Real estate", "Not sure yet"];
const BUDGETS = ["Under $500", "$500–2k", "$2k–5k", "$5k+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function Contact() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "");
    const contact = String(f.get("contact") ?? "");
    const brief = [
      `Name: ${name}`,
      `Email / WhatsApp: ${contact}`,
      `Link: ${f.get("link") || "-"}`,
      `Needs: ${needs.join(", ") || "-"}`,
      `Budget: ${budget || "-"}`,
      "",
      String(f.get("message") || ""),
    ].join("\n");
    const subject = `New project from ${name}`;

    const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (key) {
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: key, subject, from_name: "blackframelab website", replyto: contact.includes("@") ? contact : undefined, message: brief }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error();
        setStatus("sent");
        return;
      } catch {
        setStatus("error");
        return;
      }
    }
    // No form service configured: hand the brief to the visitor's email app, and say so honestly.
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
    setStatus("mailto");
  };

  return (
    <section className="relative overflow-hidden mx-auto max-w-[1400px] px-4 md:px-8 pt-12 md:pt-16 pb-24 grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Spotlight />
      <div>
        <WordReveal lines={["Send", "[footage.]"]} className="display text-[20vw] md:text-[9rem]" />
        <p className="mt-6 text-lg text-bone/90 max-w-md">
          Tell us what you need and drop a link if you have one. A founder replies, usually within 12 hours, with how we'd cut it, a price and a date.
        </p>

        <div className="mt-10 flex flex-col gap-3 max-w-md">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="bg-tally text-ink px-5 py-4 font-semibold text-lg flex justify-between hover:bg-bone">
            WhatsApp us <span className="tc self-center">{WHATSAPP_DISPLAY}</span>
          </a>
          <a href={`mailto:${STUDIO_EMAIL}`} className="border border-rule px-5 py-4 font-semibold text-lg flex justify-between hover:border-bone">
            Email <span className="tc self-center text-dim">{STUDIO_EMAIL}</span>
          </a>
          {CALENDAR_URL && (
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="border border-rule px-5 py-4 font-semibold text-lg hover:border-bone">
              Book a 15-minute call
            </a>
          )}
        </div>
        <p className="mt-6 tc text-dim">We work India time (IST). Nights in the US are our mornings.</p>
      </div>

      <div className="border border-rule bg-panel p-5 md:p-8">
        {status === "sent" ? (
          <Done title="Got it." body="Your brief is in our inbox. A founder will reply soon, usually within 12 hours." />
        ) : status === "mailto" ? (
          <Done
            title="One more step."
            body={`Your email app should have opened with the brief filled in. Press send there and we'll have it. Nothing opened? Email ${STUDIO_EMAIL} or WhatsApp ${WHATSAPP_DISPLAY}.`}
          />
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-6">
            <h2 className="display text-4xl">The brief</h2>
            <Field id="name" label="Your name" required autoComplete="name" />
            <Field id="contact" label="Email or WhatsApp number" required autoComplete="email" hint="Whichever you'd rather we reply on." />
            <Field id="link" label="Footage, channel or website link" type="url" hint="Optional. A Drive or Frame.io link helps us quote faster." />

            <fieldset>
              <legend className="font-semibold mb-3">What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {NEEDS.map((n) => (
                  <Chip key={n} label={n} active={needs.includes(n)} onClick={() => toggle(n)} />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-semibold mb-3">
                Rough budget <span className="text-dim font-normal">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(budget === b ? "" : b)} />
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-semibold">
                Anything else? <span className="text-dim font-normal">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} className="bg-ink border border-rule px-3 py-3 focus:border-tally outline-none" placeholder="Volume, deadline, references you like…" />
            </div>

            {status === "error" && (
              <p role="alert" className="text-tally">
                That didn't send. Please WhatsApp {WHATSAPP_DISPLAY} or email {STUDIO_EMAIL}; nothing was lost on your side.
              </p>
            )}

            <button type="submit" disabled={status === "sending"} className="bg-tally text-ink py-4 font-semibold text-lg hover:bg-bone disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send the brief"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ id, label, hint, ...rest }: { id: string; label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input id={id} name={id} {...rest} aria-describedby={hint ? `${id}-hint` : undefined} className="bg-ink border border-rule px-3 py-3 focus:border-tally outline-none" />
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-dim">
          {hint}
        </p>
      )}
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-3 py-2 border text-[15px] transition-colors ${active ? "bg-bone text-ink border-bone" : "border-rule text-bone hover:border-bone"}`}
    >
      {label}
    </button>
  );
}

function Done({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="py-10">
      <p className="display text-6xl text-tally">{title}</p>
      <p className="mt-4 text-lg max-w-md">{body}</p>
    </div>
  );
}
