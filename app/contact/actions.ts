"use server";
import { Resend } from "resend";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string; fields?: Record<string, string> };

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

/** Contact form: honeypot + basic validation + Resend. Needs RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL. */
export async function submitContact(_: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (clean(form.get("company_url_confirm"))) return { status: "ok" };

  const f = {
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200),
    company: clean(form.get("company"), 200),
    website: clean(form.get("website"), 300),
    services: form.getAll("services").map((s) => clean(s, 60)).join(", "),
    budget: clean(form.get("budget"), 60),
    details: clean(form.get("details"), 4000),
    source: clean(form.get("source"), 200),
  };

  if (!f.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    return { status: "error", message: "Please add your name and a valid email.", fields: f };
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error("Contact form is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL");
    return { status: "error", message: "The form isn't connected yet. Please email us directly; nothing you typed was sent.", fields: f };
  }

  const text = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Company: ${f.company || "-"}`,
    `Website: ${f.website || "-"}`,
    `Services: ${f.services || "-"}`,
    `Monthly budget: ${f.budget || "-"}`,
    `Heard about us: ${f.source || "-"}`,
    "",
    f.details || "(no details)",
  ].join("\n");

  try {
    const { error } = await new Resend(key).emails.send({ from, to, replyTo: f.email, subject: `New enquiry: ${f.name}${f.company ? ` (${f.company})` : ""}`, text });
    if (error) throw new Error(error.message);
    return { status: "ok" };
  } catch (e) {
    console.error("Resend error", e);
    return { status: "error", message: "That didn't send. Please email us directly; nothing you typed was lost.", fields: f };
  }
}
