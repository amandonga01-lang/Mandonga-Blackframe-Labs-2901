"use client";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import { site } from "@/content/site";

const SERVICES = ["Podcast", "Talking head", "Meta ads & UGC", "SaaS video", "Video editing", "AI editing", "Not sure yet"];
const BUDGETS = ["Under $1k", "$1k–3k", "$3k–6k", "$6k+", "Not sure yet"];

export default function QualifyForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(async (s, fd) => {
    const r = await submitContact(s, fd);
    if (r.status === "ok") track("form_submit");
    return r;
  }, { status: "idle" });
  const [budget, setBudget] = useState("");
  const v = state.fields ?? {};

  return (
    <AnimatePresence mode="wait">
      {state.status === "ok" ? (
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
              {pending ? "Sending…" : "Send enquiry"} <span aria-hidden="true">→</span>
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
