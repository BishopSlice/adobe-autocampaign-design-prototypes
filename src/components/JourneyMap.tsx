import { useEffect, useRef, useState } from 'react';
import { journey } from '../data/persona';

const AUTO_ADVANCE_INTERVAL = 3000;

export function JourneyMap() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Cycles stage 1 -> 2 -> 3 -> 1 every 3s, unless the visitor is hovering a card.
  useEffect(() => {
    if (reducedMotion || hovering) return;

    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % journey.length);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [reducedMotion, hovering]);

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {journey.map((stage, i) => {
        const isActive = i === active;
        return (
          <button
            key={stage.id}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`relative flex flex-col justify-start rounded-2xl bg-[#0c290b] p-5 text-left transition-transform duration-300 ease-out will-change-transform ${
              isActive ? 'z-10 scale-[1.08] shadow-lg' : 'scale-100 shadow-sm'
            }`}
            style={{ minHeight: 150 }}
          >
            <p className="font-source mb-1.5 text-[12px] font-bold text-white/85">{stage.stage}</p>
            <h3 className="font-source text-[12px] font-bold text-white">{stage.title}</h3>
            <p
              className={`font-source mt-4 text-[12px] font-normal leading-relaxed text-white/80 transition-opacity duration-300 ${
                isActive ? 'opacity-100 delay-150' : 'opacity-0'
              }`}
            >
              {stage.friction}
            </p>
          </button>
        );
      })}
    </div>
  );
}
