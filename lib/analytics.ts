"use client";
import { track as vercelTrack } from "@vercel/analytics";

type Event = "book_call_click" | "video_play" | "form_submit";

/** Single place for analytics events. Works with Vercel Analytics; Plausible is used too if loaded. */
export function track(event: Event, props?: Record<string, string | number>) {
  try {
    vercelTrack(event, props);
    const w = window as unknown as { plausible?: (e: string, o?: { props?: Record<string, string | number> }) => void };
    w.plausible?.(event, { props });
  } catch {
    /* analytics must never break the page */
  }
}
