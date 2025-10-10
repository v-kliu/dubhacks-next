import React from 'react';
import { motion } from 'framer-motion';

const TracksSection: React.FC = () => {
  const tracks = [
    {
      title: 'PROJECT TRACK',
      subtitle: 'For Builders',
      description: 'Already have a startup idea or existing project? Join our Project Track to accelerate your venture with intensive mentorship and resources.',
      features: [
        'Weekly founder mentorship sessions',
        'Product development workshops',
        'Investor pitch preparation',
        'Go-to-market strategy development'
      ],
      cta: 'Apply to Project Track'
    },
    {
      title: 'EIR TRACK',
      subtitle: 'For Explorers',
      description: 'Passionate about entrepreneurship but need to find the right idea? Our Entrepreneur-in-Residence track helps you discover and validate your startup concept.',
      features: [
        'Idea generation and validation workshops',
        'Industry expert mentorship',
        'Market research and customer discovery',
        'Team formation and co-founder matching'
      ],
      cta: 'Apply to EIR Track'
    }
  ];

  return (
    <section className="bg-charcoal py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="overline text-pink mb-8">THE TRACKS</div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink hidden md:block transform -translate-x-1/2"></div>
          
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-20 relative"
            >
              <div className="mb-6">
                <div className="overline text-pink mb-2">{track.title}</div>
                <h3 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
                  {track.subtitle}
                </h3>
              </div>
              
              <p className="text-gray text-body leading-relaxed mb-8">
                {track.description}
              </p>
              
              <ul className="space-y-4 mb-12">
                {track.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-pink mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-gray text-body leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="border border-neutral-700 text-neutral-900 px-6 py-3 hover:bg-pink hover:border-pink hover:text-white transition-all duration-300">
                {track.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;