export default function RecDot({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`rec inline-block shrink-0 ${className}`} />;
}
