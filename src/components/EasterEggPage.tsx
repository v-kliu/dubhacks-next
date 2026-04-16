import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsForNerds from './StatsForNerds';

const LABEL_TEXT = 'congrats, you found a hidden easter egg planted by the batch 5 exec team!';

function useTypewriter(text: string, speed = 38, startDelay = 350): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let charTimeout: ReturnType<typeof setTimeout>;

    const startTimeout = setTimeout(() => {
      const type = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          charTimeout = setTimeout(type, speed);
        } else {
          setDone(true);
        }
      };
      type();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(charTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

interface PeopleGroup {
  label: string;
  year: string;
  names: string[];
  placeholder?: boolean;
}

// Fill in placeholder entries as data becomes available
const PEOPLE_GROUPS: PeopleGroup[] = [
  {
    label: 'Founders',
    year: '2021',
    names: ['Adam Towers', 'Sharan Jhangiani'],
  },
  {
    label: 'Batch 0 Exec',
    year: '2021–2022',
    names: ['Adam Towers', 'Sharan Jhangiani', 'Sierra Lee', 'Albert Lam'],
  },
  {
    label: 'Batch 1 Exec',
    year: '2022–2023',
    names: [
      'Albert Lam',
      'Sierra Lee',
      'Rishi Kavikondala',
      'Luna Chen',
      'Anika Mishra',
    ],
  },
  {
    label: 'Batch 2 Exec',
    year: '2023–2024',
    names: [
      'Sahana Sasikumar',
      'Manasa Lingireddy',
      'Pranati Dani',
      'Abhimanyu Kumar',
      'Mohammad Zahid',
      'Hayden Lauritzen',
      'Shivang Raisurana',
      'Ryan Huang',
      'Michael Li',
      'Eric Xiao',
      'Shivesh Ummat',
      'Nick Khormaei',
    ],
  },
  {
    label: 'Batch 3 Exec',
    year: '2024–2025',
    names: [
      'Ryan Hsu',
      'Aryan Mahindra',
      'Niyati Trivedi',
      'Sthiti Patnaik',
      'Luna Chen',
      'Martin Johnson',
      'Ran Iarovich',
      'Adithi Raghavan',
    ],
  },
  {
    label: 'Batch 4 Exec',
    year: '2025–2026',
    names: [
      'Sthiti Patnaik',
      'Ryan Hsu',
      'Anshul Shah',
      'Abigail Setiawan',
      'Varun Vijayababu',
      'Farhan Khan',
    ],
  },
  {
    label: 'Batch 5 Exec',
    year: '2026–present',
    names: [
      'Anshul Shah',
      'Sthiti Patnaik',
      'Meera Patel',
      'Jordan Lee',
      'Aarfan Hussain',
      'Sanjana Satagopan',
      'Victor Liu',
      'Areej Hassan',
      'Danielle Bae',
      'Ryan Hsu',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.14,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const EasterEggPage: React.FC = () => {
  const { displayed, done } = useTypewriter(LABEL_TEXT);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Minimal Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/5 px-6 md:px-12 py-5">
        <div className="max-w-content mx-auto flex items-center justify-between">
          <span className="text-white font-light tracking-widest text-xs uppercase">
            DubHacks Next
          </span>
          <Link
            to="/"
            className="text-white/35 hover:text-white/80 text-xs tracking-widest uppercase transition-colors duration-300"
          >
            ← home
          </Link>
        </div>
      </header>

      {/* ── Hero / Quote ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 pt-28 pb-20">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          animate="visible"
        >
          {/* Label — typewriter */}
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-pink text-xs tracking-widest mb-14 font-light min-h-[1.25rem]"
          >
            {displayed}
            {!done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block ml-px"
              >
                |
              </motion.span>
            )}
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-white/90 leading-tight mb-10"
            style={{ letterSpacing: '-0.025em' }}
          >
            "Everything around you that you call life was built by people no
            smarter than you are."
          </motion.blockquote>

          {/* Attribution */}
          <motion.cite
            variants={fadeUp}
            custom={2}
            className="text-white/35 text-sm tracking-widest font-light not-italic uppercase"
          >
            — Steve Jobs, 1994
          </motion.cite>

          {/* Funny follow-up */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-white/45 text-sm font-light mt-10 italic"
          >
            "and that sthiti is batch 5's most scary exec" — batch 5
          </motion.p>
        </motion.div>

        {/* Subtle scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── People Shoutouts ── */}
      <section className="px-6 md:px-12 py-24 border-t border-white/5">
        <div className="max-w-content mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2
              className="text-white font-light text-3xl md:text-4xl mb-4"
              style={{ letterSpacing: '-0.025em' }}
            >
              The people who made this real.
            </h2>
            <p className="text-white/45 text-sm md:text-base font-light max-w-lg">
              Thanks to these wonderful people for running DubHacks Next
              throughout the years.
            </p>
          </motion.div>

          {/* People rows */}
          <div>
            {PEOPLE_GROUPS.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 py-5 border-b border-white/5"
              >
                {/* Label + year */}
                <div className="flex items-baseline gap-3 sm:w-56 flex-shrink-0">
                  <span className="text-pink text-xs tracking-widest uppercase font-light">
                    {group.label}
                  </span>
                  <span className="text-white/22 text-xs font-light">
                    {group.year}
                  </span>
                </div>

                {/* Names */}
                <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                  {group.placeholder ? (
                    <span className="text-white/18 text-sm font-light italic">
                      names coming soon
                    </span>
                  ) : (
                    group.names.map((name, i) => (
                      <React.Fragment key={name}>
                        <span className="text-white/70 text-sm md:text-base font-light">
                          {name}
                        </span>
                        {i < group.names.length - 1 && (
                          <span className="text-white/18 text-sm mx-2">·</span>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats for Nerds ── */}
      <StatsForNerds />

      {/* ── Minimal Footer ── */}
      <footer className="px-6 md:px-12 py-8 border-t border-white/5">
        <div className="max-w-content mx-auto grid grid-cols-3 items-center text-white/50 text-xs tracking-wide font-light">
          <span className="uppercase">© 2026 DubHacks Next</span>
          <span className="text-center">Made with ❤️ by the DubHacks Next Team</span>
          <span className="text-right uppercase">University of Washington</span>
        </div>
      </footer>
    </div>
  );
};

export default EasterEggPage;
