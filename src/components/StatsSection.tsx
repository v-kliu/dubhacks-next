import React from 'react';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  const stats = [
    { number: '$3M+', label: 'Total Raised' },
    { number: '150+', label: 'Alumni Founders' },
    { number: '4', label: 'Batches Completed' },
    { number: '25+', label: 'Active Companies' },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-accent-50 py-16">
      <div className="grid-overlay opacity-30"></div>
      
      <div className="content-grid">
        <div className="guide-line pl-4 md:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="overline text-primary-600 inline-block px-4 py-2 bg-primary-100/50 rounded-full">BY THE NUMBERS</div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/85 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-primary-200 shadow-md shadow-primary-500/10 card-hover text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl text-primary-600 font-light mb-3 md:mb-4">
                  {stat.number}
                </div>
                <div className="pink-underline-thin mx-auto mb-3 md:mb-4"></div>
                <div className="text-neutral-600 text-xs md:text-sm font-medium leading-relaxed">
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