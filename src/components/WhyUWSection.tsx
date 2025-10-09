import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Lightbulb } from 'lucide-react';

const WhyUWSection: React.FC = () => {
  const pillars = [
    {
      icon: Building2,
      title: 'UW Resources',
      description: 'Access to world-class research facilities, expert faculty mentors, and the extensive UW alumni network spanning Fortune 500 companies to innovative startups.'
    },
    {
      icon: Users,
      title: 'Seattle Ecosystem',
      description: 'Immerse yourself in the thriving Pacific Northwest tech scene, with direct connections to Amazon, Microsoft, and hundreds of venture-backed startups.'
    },
    {
      icon: Lightbulb,
      title: 'Founder Community',
      description: 'Join an exclusive network of student entrepreneurs, successful alumni founders, and industry leaders committed to your startup success.'
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
          <div className="overline text-pink mb-6">BUILT IN SEATTLE</div>
          <h2 className="text-5xl md:text-6xl font-light text-black mb-8">
            Pacific Northwest's Premier
            <br />
            Student Incubator
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 text-pink">
                <pillar.icon size={64} strokeWidth={1} />
              </div>
              
              <h3 className="text-2xl font-light text-black mb-6 pink-underline-thin">
                {pillar.title}
              </h3>
              
              <p className="text-gray text-body leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUWSection;