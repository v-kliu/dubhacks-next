import React from 'react';
import { motion } from 'framer-motion';

const ApplicationCTASection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 py-32 overflow-hidden">
      <div className="grid-overlay opacity-20"></div>
      
      <div className="content-grid">
        <div className="guide-line pl-8 text-center">
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
            
            <p className="text-white/90 text-subhead max-w-2xl mx-auto leading-relaxed">
              Applications close March 1st, 2025
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <button className="bg-white text-primary-600 px-12 py-6 text-xl rounded-xl hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 font-semibold">
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
              Only 20 spots available. Apply early.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTASection;