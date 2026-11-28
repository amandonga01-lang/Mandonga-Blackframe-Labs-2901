"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  event?: "book_call_click";
  className?: string;
  external?: boolean;
};

/** Pill buttons. Primary = signal red with ink text (5.2:1, AA). */
export default function Button({ href, children, variant = "primary", size = "md", event, className = "", external }: Props) {
  const base = "group inline-flex items-center gap-3 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform] duration-500 ease-studio active:scale-[0.98]";
  const sizes = size === "lg" ? "h-14 px-7 text-[17px]" : "h-11 px-5 text-[15px]";
  const variants = {
    primary: "bg-signal text-ink hover:bg-white",
    outline: "border border-muted text-text hover:border-text",
    ghost: "text-text-2 hover:text-text",
  }[variant];
  const onClick = event ? () => track(event) : undefined;
  const cls = `${base} ${sizes} ${variants} ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="transition-transform duration-500 ease-studio group-hover:translate-x-1">→</span>
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} onClick={onClick} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  );
}
