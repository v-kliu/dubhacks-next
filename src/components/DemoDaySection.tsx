import React from 'react';
import { motion } from 'framer-motion';

const DemoDaySection: React.FC = () => {
  return (
    <section className="bg-charcoal py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-lightGray border border-pink relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 relative">
                <div className="absolute inset-0 bg-pink/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-light">Demo Day 2024</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="overline text-pink mb-6">DEMO DAY 2024</div>
              <h2 className="large-title text-white font-light mb-8">
                The Moment That Matters
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/70 text-body leading-relaxed mb-8"
            >
              After 16 weeks of intensive development, our founders present their 
              startups to a curated audience of investors, industry leaders, and 
              the Seattle tech community. It's where ideas become funded realities.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 mb-12"
            >
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">200+</div>
                <div className="text-white/60 text-sm">Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">50+</div>
                <div className="text-white/60 text-sm">Investors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">8</div>
                <div className="text-white/60 text-sm">Presentations</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button className="border border-white text-white px-8 py-4 hover:bg-pink hover:border-pink hover:text-white transition-all duration-300">
                Watch Previous Demo Day
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoDaySection;