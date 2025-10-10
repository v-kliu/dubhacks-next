import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const stats = [
    { value: '$3M+', label: 'Raised' },
    { value: '32', label: 'Founders' },
    { value: '4', label: 'Batches' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <div className="grid-overlay"></div>
      
      <div className="content-grid min-h-screen">
        <div className="guide-line pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col justify-center min-h-screen py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="grid grid-cols-1 gap-8 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-primary-100 card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.0 + index * 0.1, duration: 0.6 }}
                  >
                    <div className="text-4xl md:text-5xl font-light text-primary-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-neutral-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="space-y-8 lg:order-1">
                <motion.img
                  src="/dubhacksnext.png"
                  alt="DubHacks Next Logo"
                  className="w-24 h-24 object-contain mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                />
                
                <div className="overline text-primary-600 mb-6">
                  UNIVERSITY OF WASHINGTON
                </div>
                
                <h1 className="hero-text text-neutral-900 leading-tight">
                  Building{' '}
                  <span className="pink-underline text-primary-600">Tomorrow's</span>{' '}
                  Founders
                </h1>
                
                <p className="text-neutral-600 text-subhead max-w-xl leading-relaxed">
                  An invitation-only 16-week program transforming exceptional UW students 
                  into funded startup founders through intensive mentorship, resources, and community.
                </p>
                
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2, duration: 0.6 }}
                >
                  <button className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 transform hover:scale-105">
                    Apply for Batch 5
                  </button>
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