import React from 'react';
import { motion } from 'framer-motion';

const ApplicationCTASection: React.FC = () => {
  return (
    <section id="apply" className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 py-20 overflow-hidden">
      <div className="grid-overlay opacity-20"></div>
      
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-6xl md:text-8xl font-light text-white leading-tight">
              Apply to Batch 5
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mt-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-white/60 text-sm font-light">Priority Deadline:</span>
                <span className="text-white text-lg font-medium">Oct 24</span>
              </div>

              <span className="hidden sm:inline text-white/40">•</span>

              <div className="flex items-baseline gap-2">
                <span className="text-white/60 text-sm font-light">Regular Deadline:</span>
                <span className="text-white text-lg font-medium">Nov 1</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <button
                onClick={() => {
                  const tracksSection = document.getElementById('tracks');
                  if (tracksSection) {
                    tracksSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-primary-600 px-12 py-6 text-xl rounded-xl hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Start Your Application
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-white/80 text-sm pt-4"
            >
              Limited spots available. Apply early for priority consideration.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTASection;