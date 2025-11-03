import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

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
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </motion.div>
            </div>

            <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
              Currently Incubating Batch 5
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white text-lg md:text-xl pt-4 max-w-2xl mx-auto"
            >
              Applications for Batch 6 will open Autumn 2026!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTASection;