import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: 'Anshul', role: 'Managing Director' },
    { name: 'Sthiti', role: 'Managing Director' },
    { name: 'Ryan', role: 'Advisor' },
    { name: 'Meera', role: 'Director of Projects' },
    { name: 'Jordan', role: 'Director of Projects' },
    { name: 'Victor', role: 'Director of Technology', image: '/victor-headshot.jpg' },
    { name: 'Aarfan', role: 'EiR Director' },
    { name: 'Sanjana', role: 'Director of Community' }
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
          <div className="overline text-pink mb-6">THE TEAM</div>
          <h2 className="section-title text-neutral-900">Run by Students, For Students</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6 overflow-hidden">
                <div className="w-full aspect-square bg-lightGray border border-gray-200 group-hover:border-pink group-hover:border-[3px] transition-all duration-300 grayscale group-hover:grayscale-0">
                  {member.name === 'Victor' && member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center relative">
                      <span className="text-white text-xl font-light">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/10 transition-all duration-300"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-neutral-900 font-light text-lg mb-2">{member.name}</h3>
              <p className="text-gray text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;