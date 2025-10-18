import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TracksSection: React.FC = () => {
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  const tracks = [
    {
      title: 'EIR TRACK',
      subtitle: 'For Explorers',
      description: 'Are you a builder interested in technology entrepreneurship? Join Next as an Entrepreneur-in-Residence! This provides you a personalized pathway to guide and support your entrepreneurial journey, ensuring your success.',
      features: [
        'Workshops, speaker events, and networking opportunities',
        'An environment to explore, build, and break your ideas',
        'Ad-hoc advising via the Next team and our partners and sponsors',
        'Introduction to Seattle\'s Entrepreneurship Ecosystem through joint off-campus events',
        'A community of fellow EiRs (potential co-Founders) and student founders at UW',
        'Present at Demo Day'
      ],
      lookingFor: {
        title: 'What We\'re Looking For',
        description: 'We\'re looking for passionate individuals eager to learn and/or create their own startups in the future.',
        criteria: [
          'Builders with a desire to build exciting and impactful technology',
          'Bonus points if you have engineering, business, product, and/or design skills',
          'Endlessly curious and ready to learn',
          'Extremely passionate about the tech startup space',
          'Problem-solvers who take initiative',
          'Excited to meet like-minded people at UW'
        ]
      },
      cta: 'Apply to EIR Track'
    },
    {
      title: 'PROJECT TRACK',
      subtitle: 'For Builders',
      description: 'Are you someone with a promising project that you want to take to the next level? Join Next as a project in our incubator! Go through the program alongside other teams of founders.',
      features: [
        'Strategic goal-setting and accountability methods',
        'Workshops, speaker events, and networking',
        'Ad-hoc advising via the Next team and our partners and sponsors',
        'Hiring support',
        'Access to our network',
        'A community of amazing fellow founders and Entrepreneurs-in-Residence!',
        'Present at Demo Day'
      ],
      lookingFor: {
        title: 'What We\'re Looking For',
        description: 'We\'re looking for teams and individuals excited to push their projects to the next level.',
        criteria: [
          'Passionate and insightful about the problem they\'re tackling',
          'Familiar with the tech startup space',
          'Deeply thinking about both their project\'s engineering and business capabilities',
          'Excited to meet fellow founders at UW!'
        ]
      },
      cta: 'Apply to Project Track'
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedTrack(expandedTrack === index ? null : index);
  };

  return (
    <section id="tracks" className="bg-charcoal py-12 md:py-section px-4 md:px-6 lg:px-12">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="overline text-pink inline-block px-4 py-2 bg-pink/10 rounded-full">THE TRACKS</div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink hidden md:block transform -translate-x-1/2"></div>

          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 lg:p-20 relative"
            >
              <div className="mb-4 md:mb-6">
                <div className="overline text-pink mb-2">{track.title}</div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 mb-4">
                  {track.subtitle}
                </h3>
              </div>

              <p className="text-gray text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                {track.description}
              </p>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {track.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-pink mt-2 md:mt-3 mr-3 md:mr-4 flex-shrink-0"></div>
                    <span className="text-gray text-sm md:text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Expandable "What We're Looking For" section */}
              <div className="mb-6 md:mb-8">
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full flex items-center justify-between text-left py-3 px-4 bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300 rounded-lg group"
                >
                  <span className="text-neutral-900 font-medium text-sm md:text-base">
                    {track.lookingFor.title}
                  </span>
                  {expandedTrack === index ? (
                    <ChevronUp size={20} className="text-pink group-hover:text-primary-600 transition-colors" />
                  ) : (
                    <ChevronDown size={20} className="text-pink group-hover:text-primary-600 transition-colors" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedTrack === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 px-4">
                        <p className="text-gray text-sm md:text-base mb-4 leading-relaxed italic">
                          {track.lookingFor.description}
                        </p>
                        <ul className="space-y-2">
                          {track.lookingFor.criteria.map((criterion, criterionIndex) => (
                            <li key={criterionIndex} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-primary-600 mt-2 mr-3 flex-shrink-0 rounded-full"></div>
                              <span className="text-gray text-sm leading-relaxed">{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfRb7MkZ8gdDJxxamaDNbfa2YfsZtAvrAiyXWe_AZHSR8_kLw/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center border border-neutral-700 text-neutral-900 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base hover:bg-pink hover:border-pink hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                {track.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;