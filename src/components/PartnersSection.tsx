import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'Microsoft', category: 'Technology Partner' },
    { name: 'Amazon Web Services', category: 'Cloud Partner' },
    { name: 'Techstars', category: 'Accelerator Partner' },
    { name: 'Y Combinator', category: 'Startup Partner' },
    { name: 'University of Washington', category: 'Academic Partner' },
    { name: 'Seattle Angel Fund', category: 'Investment Partner' },
    { name: 'Founders\' Co-op', category: 'Community Partner' },
    { name: 'Pioneer Square Labs', category: 'Venture Partner' }
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-accent-50 py-24">
      <div className="grid-overlay opacity-20"></div>
      
      <div className="content-grid">
        <div className="guide-line pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="overline text-primary-600 mb-8">OUR NETWORK</div>
            <h2 className="section-title text-neutral-900">Partners & Sponsors</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto mt-6">
              Backed by industry leaders who believe in the next generation of founders
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-primary-100 card-hover text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300">
                  <span className="text-primary-600 font-bold text-lg">
                    {partner.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <h3 className="text-neutral-900 font-medium mb-2 text-sm">
                  {partner.name}
                </h3>
                <p className="text-neutral-500 text-xs">
                  {partner.category}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 transform hover:scale-105">
              Partner With Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;