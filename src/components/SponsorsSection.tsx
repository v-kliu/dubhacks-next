import React from 'react';
import { motion } from 'framer-motion';

const SponsorsSection: React.FC = () => {
  const sponsors = [
    {
      name: 'Pack Ventures',
      logo: '/assets/partners_and_mentors/pack.jpg',
      descriptor: "UW's Preferred Venture Partner",
      detail: '$30M Fund · 29 Husky-Founded Startups',
      tag: 'Venture Partner',
    },
    {
      name: 'Pillsbury Winthrop Shaw Pittman',
      logo: '/assets/partners_and_mentors/pillsbury.png',
      descriptor: 'Premier Startup & Technology Legal Counsel',
      detail: 'Formation · Fundraising · M&A · IPO',
      tag: 'Legal Partner',
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 border-t border-b border-neutral-100">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="overline text-pink mb-4 tracking-widest text-xs font-semibold uppercase">
            Proudly Supported By
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
            Our Sponsors
          </h2>
          <p className="mt-3 text-neutral-500 text-base max-w-xl mx-auto">
            DubHacks Next is made possible by partners who believe in the next generation of UW founders.
          </p>
        </motion.div>

        {/* Sponsor Cards */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-3xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="flex-1 group relative bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Sponsor Tag */}
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
                {sponsor.tag}
              </span>

              {/* Logo container */}
              <div className="w-full flex items-center justify-center mb-6 h-24">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-h-20 max-w-[200px] w-auto object-contain"
                />
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-gradient-to-r from-primary-300 to-accent-300 mb-5" />

              {/* Text */}
              <h3 className="font-bold text-neutral-900 text-lg leading-tight mb-2">
                {sponsor.name}
              </h3>
              <p className="text-neutral-600 text-sm font-medium mb-1">
                {sponsor.descriptor}
              </p>
              <p className="text-neutral-400 text-xs">
                {sponsor.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
