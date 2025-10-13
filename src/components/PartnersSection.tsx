import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection: React.FC = () => {
  // Function to get partner logo
  const getPartnerLogo = (name: string): string => {
    const logos: { [key: string]: string } = {
      'Y Combinator': '/assets/partners_and_mentors/yc.svg',
      'Khosla Ventures': '/assets/partners_and_mentors/khosla.png',
      'Madrona Venture Group': '/assets/partners_and_mentors/madrona.jpg',
      'Techstars': '/assets/partners_and_mentors/techstars.svg',
      'Pack Ventures': '/assets/partners_and_mentors/pack.jpg',
      'University of Washington': '/assets/partners_and_mentors/uw.jpg',
      'Amazon Web Services': '/assets/partners_and_mentors/aws.svg',
    };
    return logos[name] || '';
  };

  // Partners sorted by impressiveness
  const partners = [
    { name: 'Y Combinator', category: 'Accelerator' },
    { name: 'Khosla Ventures', category: 'Venture Capital' },
    { name: 'Madrona Venture Group', category: 'Venture Capital' },
    { name: 'Techstars', category: 'Accelerator' },
    { name: 'Pack Ventures', category: 'Venture Capital' },
    { name: 'University of Washington', category: 'Academic Partner' },
    { name: 'Amazon Web Services', category: 'Cloud Platform' },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-50 to-accent-50 py-16">
      <div className="grid-overlay opacity-20"></div>

      <div className="content-grid">
        <div className="guide-line pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="overline text-primary-600 mb-4 inline-block px-4 py-2 bg-primary-100/50 rounded-full">OUR NETWORK</div>
            <h2 className="section-title text-neutral-900">Partners & Sponsors</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto mt-6">
              Backed by industry leaders who believe in the next generation of founders
            </p>
          </motion.div>

          {/* 5 partners per row for more compact display */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-primary-100 card-hover text-center group"
              >
                <div className="w-full h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 p-3 group-hover:scale-105 transition-all duration-300">
                  {getPartnerLogo(partner.name) ? (
                    <img
                      src={getPartnerLogo(partner.name)}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-primary-600 font-bold text-base">
                      {partner.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </span>
                  )}
                </div>
                <h3 className="text-neutral-900 font-medium mb-2 text-sm leading-tight">
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
            transition={{ duration: 0.6, delay: 0.6 }}
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
