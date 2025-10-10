import React from 'react';
import { motion } from 'framer-motion';

const AlumniSuccessSection: React.FC = () => {
  const companies = [
    {
      name: 'vly.com',
      description: 'The world\'s best AI web app builder.',
      funding: 'Raised $1M+',
      badge: 'Batch 3'
    },
    {
      name: 'Meteor',
      description: 'A browser that can do work on your behalf.',
      funding: 'Raised $1M+',
      badge: 'Batch 4'
    },
    {
      name: 'Koel Labs',
      description: 'Speech Technology for Anyone Built by Everyone.',
      funding: 'Raised $500K+',
      badge: 'Batch 4'
    },
    {
      name: 'Ripple',
      description: 'The first hyperlocal marketplace built by and for college students.',
      funding: 'Pre-seed',
      badge: 'Batch 4'
    },
    {
      name: 'Soarin',
      description: 'Building professional identities from preexisting data.',
      funding: 'Pre-seed',
      badge: 'Batch 4'
    }
  ];

  return (
    <section className="bg-white py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="overline text-pink mb-6">PORTFOLIO</div>
          <h2 className="section-title text-neutral-900">Our Founders Are Funded</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border-t-2 border-pink p-8 hover:shadow-lg hover:transform hover:translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-lightGray border border-gray-200 flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <span className="text-gray text-xs font-bold">{company.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-light text-neutral-900 mb-2">{company.name}</h3>
                <p className="text-gray text-sm leading-relaxed mb-4">{company.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="bg-pink/10 text-pink px-3 py-1 rounded-full text-xs font-medium">
                  {company.funding}
                </span>
                <span className="text-gray text-xs">{company.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSuccessSection;