import React from 'react';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  const stats = [
    { number: '$1M+', label: 'Term Sheets Raised' },
    { number: '30+', label: 'Founders per Cohort' },
    { number: '4', label: 'Batches' },
    { number: '100%', label: 'UW Students' },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-accent-50 py-24">
      <div className="grid-overlay opacity-30"></div>
      
      <div className="content-grid">
        <div className="guide-line pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="overline text-primary-600 mb-8">BY THE NUMBERS</div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-primary-100 card-hover text-center"
              >
                <div className="text-5xl lg:text-6xl text-primary-600 font-light mb-4">
                  {stat.number}
                </div>
                <div className="pink-underline-thin mx-auto mb-4"></div>
                <div className="text-neutral-600 text-sm font-medium leading-relaxed">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;