import React, { useEffect, useState } from 'react';
import { PRIORITY_DEADLINE_AT, FINAL_DEADLINE_AT } from '../data/applicationLinks';

interface Deadline {
  label: string;
  at: number;
}

// Counts down to the first of these that is still in the future; renders nothing once both have passed
const DEADLINES: Deadline[] = [
  { label: 'Priority deadline', at: Date.parse(PRIORITY_DEADLINE_AT) },
  { label: 'Applications close', at: Date.parse(FINAL_DEADLINE_AT) }
];

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const splitRemaining = (ms: number): Remaining => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  };
};

const plural = (value: number, unit: string): string => `${value} ${unit}${value === 1 ? '' : 's'}`;

const useCountdown = (): { deadline: Deadline; remaining: Remaining } | null => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const deadline = DEADLINES.find((candidate) => candidate.at > now);
  return deadline ? { deadline, remaining: splitRemaining(deadline.at - now) } : null;
};

interface DeadlineCountdownProps {
  /** `inline` is a single sentence; `tiles` is the big days/hours/minutes/seconds row */
  variant: 'inline' | 'tiles';
  className?: string;
}

const DeadlineCountdown: React.FC<DeadlineCountdownProps> = ({ variant, className = '' }) => {
  const countdown = useCountdown();
  if (!countdown) return null;
  const { deadline, remaining } = countdown;

  if (variant === 'inline') {
    const parts = [
      remaining.days > 0 ? plural(remaining.days, 'day') : null,
      remaining.days > 0 || remaining.hours > 0 ? plural(remaining.hours, 'hour') : null,
      plural(remaining.minutes, 'minute')
    ].filter((part): part is string => part !== null);

    return (
      <span className={className}>
        {deadline.label} in {parts.join(', ')}
      </span>
    );
  }

  const tiles: [string, number][] = [
    ['days', remaining.days],
    ['hours', remaining.hours],
    ['minutes', remaining.minutes],
    ['seconds', remaining.seconds]
  ];

  return (
    <div className={className}>
      <div className="overline text-white/80 mb-3 md:mb-4">{deadline.label} in</div>
      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
        {tiles.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col items-center w-18 sm:w-20 md:w-24 py-3 md:py-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tabular-nums leading-none">
              {String(value).padStart(2, '0')}
            </span>
            <span className="mt-1.5 md:mt-2 text-sm text-white/80">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeadlineCountdown;
