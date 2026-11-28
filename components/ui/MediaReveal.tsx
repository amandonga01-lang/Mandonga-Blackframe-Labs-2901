/** Media reveal: the rounded clip opens and the media settles from 1.04 to 1 as it scrolls in. Pure CSS (.media-reveal). */
export default function MediaReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`media-reveal overflow-hidden rounded-xl ${className}`}>{children}</div>;
}
