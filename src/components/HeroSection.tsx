import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';
import { APPLICATIONS_OPEN, OPEN_DATE } from '../data/applicationLinks';
import HeroGrid from './HeroGrid';
import DeadlineCountdown from './DeadlineCountdown';

const HeroSection: React.FC = () => {
  const stats = [
    { value: '$5M+', label: 'Raised' },
    { value: '68', label: 'Startups' },
    { value: '5', label: 'Batches' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <HeroGrid />

      <div className="content-grid min-h-screen relative z-10">
        <div className="guide-line pl-4 md:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center min-h-screen py-12 md:py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                data-grid-obstacle
                className="hidden lg:grid grid-cols-1 gap-3 md:gap-6 lg:gap-8 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-2 border-primary-200 shadow-lg shadow-primary-500/10 card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-600 mb-1 md:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-base text-neutral-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="space-y-6 md:space-y-8 lg:order-1">
                <div
                  data-grid-obstacle
                  className="overline text-primary-600 mb-2 inline-block px-4 py-2 bg-primary-100/50 rounded-full"
                >
                  UNIVERSITY OF WASHINGTON
                </div>

                <h1 className="hero-text text-neutral-900 leading-tight">
                  Building Tomorrow's{' '}
                  <span className="pink-underline text-primary-600 italic">Founders</span>
                </h1>

                <p className="text-neutral-600 text-base md:text-lg lg:text-subhead max-w-xl leading-relaxed">
                  A 16-week program transforming exceptional UW students into funded startup founders
                  through intensive mentorship, resources, and community at UW's Top Startup Incubator.
                </p>

                <motion.div
                  className="mt-6 md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <a
                    data-grid-obstacle
                    href="#apply"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('apply');
                    }}
                    className="group inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 min-h-[44px] bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-xl p-4 md:p-6 shadow-lg shadow-primary-500/10 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-sm md:text-base text-primary-600 font-medium text-center">
                      {APPLICATIONS_OPEN ? 'Batch 6 applications are open!' : `Batch 6 applications open ${OPEN_DATE}!`}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm md:text-base text-primary-700 font-semibold">
                      {APPLICATIONS_OPEN ? 'Apply now' : 'Learn more'}
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <DeadlineCountdown
                      variant="inline"
                      className="basis-full text-center text-sm text-neutral-600 tabular-nums"
                    />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;