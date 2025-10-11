import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building, Users, Star, Handshake, Globe } from 'lucide-react';

const SpeakersSection: React.FC = () => {
  const speakers = [
    {
      name: 'Jensen Huang',
      title: 'CEO & Founder, NVIDIA',
      batch: 'Batch 3 Mentor',
      category: 'Tech Leadership',
      description: 'Shared insights on AI revolution and building transformative technology companies',
      image: '/assets/speakers/jensen-huang.jpg'
    },
    {
      name: 'Reid Hoffman',
      title: 'Co-Founder, LinkedIn',
      batch: 'Batch 2 Speaker',
      category: 'Network Effects', 
      description: 'Discussed building professional networks and scaling platform businesses',
      image: '/assets/speakers/reid-hoffman.jpg'
    },
    {
      name: 'Melinda Gates',
      title: 'Co-Chair, Gates Foundation',
      batch: 'Batch 4 Keynote',
      category: 'Impact & Purpose',
      description: 'Inspired founders to build companies that create positive social impact',
      image: '/assets/speakers/melinda-gates.jpg'
    },
    {
      name: 'Brian Chesky',
      title: 'CEO & Co-Founder, Airbnb',
      batch: 'Batch 1 Mentor',
      category: 'Design Thinking',
      description: 'Taught product design principles and customer-centric innovation',
      image: '/assets/speakers/brian-chesky.jpg'
    },
    {
      name: 'Satya Nadella',
      title: 'CEO, Microsoft',
      batch: 'Batch 3 Speaker',
      category: 'Growth Mindset',
      description: 'Emphasized the importance of continuous learning and adaptation',
      image: '/assets/speakers/satya-nadella.jpg'
    },
    {
      name: 'Susan Wojcicki',
      title: 'Former CEO, YouTube',
      batch: 'Batch 2 Mentor',
      category: 'Content Strategy',
      description: 'Shared strategies for building and scaling content platforms',
      image: '/assets/speakers/susan-wojcicki.jpg'
    }
  ];

  const partners = [
    { name: 'Microsoft', category: 'Technology Partner', type: 'partner' },
    { name: 'Amazon Web Services', category: 'Cloud Partner', type: 'partner' },
    { name: 'Techstars', category: 'Accelerator Partner', type: 'partner' },
    { name: 'Y Combinator', category: 'Startup Partner', type: 'partner' },
    { name: 'University of Washington', category: 'Academic Partner', type: 'partner' },
    { name: 'Seattle Angel Fund', category: 'Investment Partner', type: 'partner' },
    { name: 'Founders\' Co-op', category: 'Community Partner', type: 'partner' },
    { name: 'Pioneer Square Labs', category: 'Venture Partner', type: 'partner' }
  ];

  const categories = [
    { icon: Building, label: 'Tech Leadership', count: '15+ Speakers' },
    { icon: Users, label: 'Network Effects', count: '10+ Sessions' },
    { icon: Award, label: 'Impact & Purpose', count: '8+ Workshops' },
    { icon: Star, label: 'Design Thinking', count: '12+ Mentors' },
    { icon: Handshake, label: 'Partners', count: '20+ Organizations' },
    { icon: Globe, label: 'Global Network', count: '50+ Connections' }
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
          <div className="overline text-pink mb-6">OUR NETWORK</div>
          <h2 className="section-title text-white mb-6">Speakers, Mentors & Partners</h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Learn from industry legends, partner with leading organizations, and connect with transformational leaders 
            who support our community across every batch.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="text-white" size={20} />
              </div>
              <h3 className="text-white font-medium text-xs mb-1">{category.label}</h3>
              <p className="text-white/60 text-xs">{category.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Combined Grid - Speakers and Partners */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Speakers */}
          {speakers.map((speaker, index) => (
            <motion.div
              key={`speaker-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <span class="text-primary-600 font-bold text-lg">
                            ${speaker.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-lg truncate">{speaker.name}</h3>
                  <p className="text-white/70 text-sm truncate">{speaker.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full">
                      {speaker.batch}
                    </span>
                    <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                      {speaker.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed">
                {speaker.description}
              </p>
            </motion.div>
          ))}

          {/* Partners */}
          {partners.map((partner, index) => (
            <motion.div
              key={`partner-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (speakers.length + index) * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-200 to-primary-200 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-primary-600 font-bold text-lg">
                    {partner.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{partner.name}</h3>
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 text-xs rounded-full">
                  {partner.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpeakersSection;