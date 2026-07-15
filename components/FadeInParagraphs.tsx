'use client';
import { useEffect, useState } from 'react';

const PARAGRAPHS = [
  'Something new is coming to Reno.',
  'A directory built to help you find real local businesses.',
  'Making it easier to support your neighbors instead of billionaires.',
  'Launching soon.',
];

const STAGGER_MS = 900;
const DURATION_MS = 1500;

export default function FadeInParagraphs() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= PARAGRAPHS.length) return;
    const t = setTimeout(() => setVisibleCount(c => c + 1), STAGGER_MS);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <>
      {PARAGRAPHS.map((text, i) => (
        <p
          key={i}
          className="mb-4 text-base leading-relaxed sm:text-lg font-[family-name:var(--font-ibm-plex-mono)] transition-all ease-out"
          style={{
            transitionDuration: `${DURATION_MS}ms`,
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? 'translateX(0)' : 'translateX(-40px)',
          }}
        >
          {text}
        </p>
      ))}
    </>
  );
}
