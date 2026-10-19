import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowUpRight } from 'lucide-react';
import { trackApplications, APPLICATIONS_OPEN, OPEN_DATE, PRIORITY_DEADLINE, FINAL_DEADLINE } from '../data/applicationLinks';
import { scrollToSection } from '../utils/scrollToSection';
import InteractiveGrid from './InteractiveGrid';
import DeadlineCountdown from './DeadlineCountdown';

const ApplicationCTASection: React.FC = () => {
  return (
    <section
      id="apply"
      className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 py-16 md:py-24 overflow-hidden scroll-mt-20"
    >
      <InteractiveGrid className="opacity-20" />

      <div className="relative z-10 max-w-content mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </motion.div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-tight">
              Apply to Batch 6
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              {APPLICATIONS_OPEN ? 'Applications are open.' : `Applications open ${OPEN_DATE}.`} Pick the track that fits you best.{' '}
              <span className="font-semibold">Priority deadline is {PRIORITY_DEADLINE}</span>, and applications close {FINAL_DEADLINE}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <DeadlineCountdown variant="tiles" className="pt-2" />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mt-10 md:mt-14">
          {trackApplications.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-10 flex flex-col text-left shadow-xl shadow-black/10"
            >
              <div className="overline text-pink mb-2">{track.overline}</div>
              <h3 className="font-heading text-2xl md:text-3xl font-light text-neutral-900 mb-3 md:mb-4">
                {track.title}
              </h3>
              <p className="text-gray text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1">
                {track.description}
              </p>
              {APPLICATIONS_OPEN && track.applicationUrl ? (
                <a
                  href={track.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm md:text-base font-medium rounded-lg transition-colors duration-300"
                >
                  {track.applyLabel}
                  <ArrowUpRight size={18} />
                </a>
              ) : (
                <span className="inline-flex items-center justify-center min-h-[48px] w-full sm:w-auto px-6 py-3 bg-neutral-100 text-neutral-500 text-sm md:text-base font-medium rounded-lg">
                  Opens {OPEN_DATE}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-white/90 text-sm md:text-base text-center mt-8 md:mt-10"
        >
          Not sure which track fits?{' '}
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="inline-flex items-center min-h-[44px] -my-3 px-1 underline underline-offset-4 decoration-white/60 hover:decoration-white transition-colors"
          >
            Read the FAQ
          </button>{' '}
          or email{' '}
          <a href="mailto:next@dubhacks.co" className="underline underline-offset-4 decoration-white/60 hover:decoration-white transition-colors">
            next@dubhacks.co
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
};

export default ApplicationCTASection;
