// Logo ring + condensed wordmark. The ring is the studio's existing gold mark.
export default function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="flex items-center gap-2.5">
      <img src="/Gold_BLACKFRAME_labs_logo.png" alt="" width={big ? 44 : 30} height={big ? 44 : 30} className={big ? "w-11 h-11" : "w-[30px] h-[30px]"} />
      <span className={`display ${big ? "text-4xl" : "text-[22px]"} leading-none text-bone`}>
        Blackframe<span className="text-tally">.</span>Labs
      </span>
    </span>
  );
}
