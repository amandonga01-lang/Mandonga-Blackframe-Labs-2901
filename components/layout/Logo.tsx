import Link from "next/link";
import Image from "next/image";

/** The studio's existing ring mark, rendered monochrome white to fit the black + signal-red palette. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="BlackFrameLabs, home" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image src="/Gold_BLACKFRAME_labs_logo.png" alt="" width={28} height={28} priority className="h-7 w-7 [filter:brightness(0)_invert(1)]" />
      <span className="font-display text-[19px] tracking-[-0.02em] font-normal">
        BlackFrame<span className="text-text-3">Labs</span>
      </span>
    </Link>
  );
}
