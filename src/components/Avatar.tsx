import { useState } from "react";
import type { Person } from "../lib/site";

// Shows the portrait if the file exists; otherwise initials on a frame.
export default function Avatar({ person, className = "" }: { person: Person; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (person.photo && !failed) {
    return <img src={person.photo} alt={person.name} onError={() => setFailed(true)} loading="lazy" className={`object-cover bg-panel ${className}`} />;
  }
  return (
    <span aria-hidden="true" className={`flex items-center justify-center border border-rule bg-panel display text-2xl text-tally ${className}`}>
      {initials}
    </span>
  );
}
