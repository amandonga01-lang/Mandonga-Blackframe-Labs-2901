/** Renders "**emphasis**" inside a string as <strong> (Medium weight, full white). */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>))}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*\*/g, "");
