import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// DubHacks Next launched October 2021
const LAUNCH_DATE = new Date('2021-10-01');

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
  const [topCountry, setTopCountry] = useState<string | null>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [fetchError, setFetchError] = useState(false);

  const totalVisitsDisplay = useCountUp(totalVisits);
  const uniqueVisitorsDisplay = useCountUp(uniqueVisitors);
  const countriesDisplay = useCountUp(countriesCount);
  const daysAlive = Math.floor(
    (Date.now() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Log visit — Redis atomic counter, returns totalVisits only
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' })
      .then((res) => res.json())
      .then((data: { totalVisits: number }) => {
        setTotalVisits(data.totalVisits ?? null);
      })
      .catch(() => setFetchError(true));
  }, []);

  // Fetch map dots + all stats computed from Supabase
  useEffect(() => {
    fetch('/api/locations')
      .then((res) => res.json())
      .then((data: { dots: Dot[]; uniqueVisitors: number; countriesCount: number; topCountry: string }) => {
        setDots(data.dots ?? []);
        setUniqueVisitors(data.uniqueVisitors ?? null);
        setCountriesCount(data.countriesCount ?? null);
        setTopCountry(data.topCountry ?? null);
      })
      .catch(() => {
        // Map still renders without dots
      });
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  const statCards = [
    {
      label: 'Total Visits',
      value: fetchError ? '—' : totalVisits === null ? '···' : fmt(totalVisitsDisplay),
    },
    {
      label: 'Unique Visitors',
      value: fetchError ? '—' : uniqueVisitors === null ? '···' : fmt(uniqueVisitorsDisplay),
    },
    {
      label: 'Countries Reached',
      value: countriesCount === null ? '···' : fmt(countriesDisplay),
    },
    {
      label: 'Top Country',
      value: topCountry ?? '···',
      isText: true,
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
            Stats for nerds.
          </h2>
          <p className="text-white/30 text-sm font-light">
            Since launch · Live data
          </p>
        </motion.div>

        {/* Stat grid — 2 cols on mobile, 3 on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 border border-white/8 mb-14"
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
                className={`font-light mb-2 text-pink ${
                  card.isText ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'
                }`}
                style={{ letterSpacing: card.isText ? '0' : '-0.03em' }}
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
