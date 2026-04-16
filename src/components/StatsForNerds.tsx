import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// DubHacks Next website launched April 14, 2026
const LAUNCH_DATE = new Date('2026-04-14');

interface Dot {
  latitude: number;
  longitude: number;
}

function useCountUp(target: number | null, duration = 1800): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) return;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

const StatsForNerds: React.FC = () => {
  const [totalVisits, setTotalVisits] = useState<number | null>(null);
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null);
  const [countriesCount, setCountriesCount] = useState<number | null>(null);
  const [dots, setDots] = useState<Dot[]>([]);

  const totalVisitsDisplay = useCountUp(totalVisits);
  const uniqueVisitorsDisplay = useCountUp(uniqueVisitors);
  const countriesDisplay = useCountUp(countriesCount);
  const daysAlive = Math.floor(
    (Date.now() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Fetch all stats from locations — Redis counter + Supabase geo data
  useEffect(() => {
    fetch('/api/locations')
      .then((res) => res.json())
      .then((data: { dots: Dot[]; totalVisits: number; uniqueVisitors: number; countriesCount: number }) => {
        setDots(data.dots ?? []);
        setTotalVisits(data.totalVisits ?? null);
        setUniqueVisitors(data.uniqueVisitors ?? null);
        setCountriesCount(data.countriesCount ?? null);
      })
      .catch(() => {});
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  const statCards = [
    {
      label: 'Total Visits',
      value: totalVisits === null ? '···' : fmt(totalVisitsDisplay),
    },
    {
      label: 'Unique Visitors',
      value: uniqueVisitors === null ? '···' : fmt(uniqueVisitorsDisplay),
    },
    {
      label: 'Countries Reached',
      value: countriesCount === null ? '···' : fmt(countriesDisplay),
    },
    {
      label: 'Days Alive',
      value: fmt(daysAlive),
    },
  ];

  return (
    <section className="px-6 md:px-12 py-24 border-t border-white/5">
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2
            className="text-white font-light text-3xl md:text-4xl mb-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            stats for nerds :))
          </h2>
          <p className="text-white/30 text-sm font-light">
            Since April 14, 2026 · Live data
          </p>
        </motion.div>

        {/* Stat grid — 2 cols on mobile, 3 on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 border border-white/8 mb-14"
        >
          {statCards.map((card, i) => (
            <div
              key={i}
              className="p-6 md:p-8 border-b border-r border-white/8 last:border-r-0"
              style={{
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="font-light mb-2 text-pink text-3xl md:text-4xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                {card.value}
              </div>
              <div className="text-white/35 text-xs tracking-widest uppercase">
                {card.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-white/8 overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 153, center: [10, 0] }}
            style={{ width: '100%', height: 'auto', background: 'transparent' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties['name'] !== 'Antarctica')
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: 'rgba(255,255,255,0.04)',
                          stroke: 'rgba(255,255,255,0.09)',
                          strokeWidth: 0.4,
                          outline: 'none',
                        },
                        hover: {
                          fill: 'rgba(255,255,255,0.04)',
                          stroke: 'rgba(255,255,255,0.09)',
                          strokeWidth: 0.4,
                          outline: 'none',
                        },
                        pressed: {
                          fill: 'rgba(255,255,255,0.04)',
                          stroke: 'rgba(255,255,255,0.09)',
                          strokeWidth: 0.4,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
              }
            </Geographies>
            {dots.map((dot, i) => (
              <Marker key={i} coordinates={[dot.longitude, dot.latitude]}>
                <circle
                  r={4}
                  fill="rgba(236,72,153,0.85)"
                  stroke="rgba(236,72,153,0.2)"
                  strokeWidth={7}
                />
              </Marker>
            ))}
          </ComposableMap>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsForNerds;
