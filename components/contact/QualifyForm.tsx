"use client";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import { site, whatsappLink } from "@/content/site";
import { contactForm } from "@/content/copy";

const SERVICES = contactForm.services;
const BUDGETS = contactForm.budgets;

/** Turns the form into a plain-text brief (used for the email / WhatsApp hand-off). */
function brief(fd: FormData) {
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  const head = [
    `Name: ${g("name")}`,
    `Email: ${g("email")}`,
    g("company") && `Company: ${g("company")}`,
    g("website") && `Website: ${g("website")}`,
    fd.getAll("services").length ? `Services: ${fd.getAll("services").join(", ")}` : "",
    g("budget") && `Monthly budget: ${g("budget")}`,
    g("source") && `Heard about us: ${g("source")}`,
  ].filter(Boolean);
  return [...head, "", g("details")].join("\n").trim();
}

/**
 * Qualifying form. With Resend configured it sends server-side. Without it, the form still never loses a lead:
 * submit opens the visitor's email app with the brief filled in, and offers WhatsApp with the same text.
 */
export default function QualifyForm({ configured }: { configured: boolean }) {
  const [handoff, setHandoff] = useState<string | null>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(async (s, fd) => {
    if (!configured) {
      const name = String(fd.get("name") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Please add your name and a valid email." };
      const text = brief(fd);
      setHandoff(text);
      track("form_submit", { via: "mailto" });
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New enquiry: ${name}`)}&body=${encodeURIComponent(text)}`;
      return { status: "idle" };
    }
    const r = await submitContact(s, fd);
    if (r.status === "ok") track("form_submit");
    return r;
  }, { status: "idle" });
  const [budget, setBudget] = useState("");
  const v: Record<string, string> = state.fields ?? {};

  return (
    <AnimatePresence mode="wait">
      {handoff ? (
        <motion.div key="handoff" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }} className="py-12">
          <motion.span className="block h-px bg-signal origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: EASE }} />
          <p className="t-h2 mt-10">Your brief is ready to send.</p>
          <p className="t-body mt-4">Your email app should have opened with everything filled in. Press send and we&apos;ll reply within 24 hours. Prefer WhatsApp? Same brief, one tap:</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink(handoff)} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-signal px-6 font-medium text-ink hover:bg-white">Send on WhatsApp</a>
            <a href={`mailto:${site.email}?body=${encodeURIComponent(handoff)}`} className="inline-flex h-12 items-center rounded-full border border-muted px-6 hover:border-text">Open email again</a>
          </div>
        </motion.div>
      ) : state.status === "ok" ? (
        <motion.div key="ok" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }} className="py-16">
          <motion.span className="block h-px bg-signal origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: EASE }} />
          <p className="t-h2 mt-10">Got it.</p>
          <p className="t-body mt-4">We'll reply within 24 hours, from a real person who edits.</p>
        </motion.div>
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0 }} className="grid gap-x-[var(--gutter)] gap-y-8 sm:grid-cols-2" noValidate={false}>
          <Field name="name" label="Name" required defaultValue={v.name} autoComplete="name" />
          <Field name="email" label="Email" type="email" required defaultValue={v.email} autoComplete="email" />
          <Field name="company" label="Company" defaultValue={v.company} autoComplete="organization" />
          <Field name="website" label="Website" type="url" placeholder="https://" defaultValue={v.website} autoComplete="url" />

          <fieldset className="sm:col-span-2">
            <legend className="t-mono text-text-3 mb-3">Service needed</legend>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="checkbox" name="services" value={s} className="peer sr-only" defaultChecked={v.services?.includes(s)} />
                  <span className="t-mono inline-block rounded-full border border-muted px-4 py-2.5 text-text-2 transition-colors duration-500 peer-checked:border-signal peer-checked:bg-signal peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-signal hover:border-text">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="sm:col-span-2">
            <legend className="t-mono text-text-3 mb-3">Monthly budget</legend>
            <input type="hidden" name="budget" value={budget} />
            <div role="radiogroup" className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={budget === b}
                  onClick={() => setBudget(budget === b ? "" : b)}
                  className={`t-mono rounded-full border px-4 py-2.5 transition-colors duration-500 ${budget === b ? "border-signal bg-signal text-ink" : "border-muted text-text-2 hover:border-text"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="sm:col-span-2 flex flex-col gap-2">
            <label htmlFor="details" className="t-mono text-text-3">Project details</label>
            <textarea id="details" name="details" rows={5} defaultValue={v.details} placeholder="What you're making, how often, and any deadline." className="rounded-md border border-muted bg-transparent px-5 py-4 text-[17px] outline-none transition-colors focus:border-text" />
          </div>
          <Field name="source" label="How did you hear about us?" className="sm:col-span-2" defaultValue={v.source} />

          {/* Honeypot: hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Leave this empty<input type="text" name="company_url_confirm" tabIndex={-1} autoComplete="off" /></label>
          </div>

          {state.status === "error" && (
            <p role="alert" className="sm:col-span-2 text-signal">
              {state.message} <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
            </p>
          )}
          <div className="sm:col-span-2">
            <button type="submit" disabled={pending} className="inline-flex h-14 items-center gap-3 rounded-full bg-signal px-8 text-[17px] font-medium text-ink transition-colors duration-500 hover:bg-white disabled:opacity-60">
              {pending ? "Sending…" : configured ? "Send enquiry" : "Send brief by email"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ name, label, className = "", ...rest }: { name: string; label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="t-mono text-text-3">{label}{rest.required && <span className="text-signal"> *</span>}</label>
      <input id={name} name={name} {...rest} className="h-14 rounded-md border border-muted bg-transparent px-5 text-[17px] outline-none transition-colors focus:border-text" />
    </div>
  );
}
