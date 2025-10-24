import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const getTeamMemberImage = (name: string): string => {
  const images: { [key: string]: string } = {
    'Anshul': '/assets/team_headshots/anshul.jpg',
    'Sthiti': '/assets/team_headshots/sthiti.png',
    'Meera': '/assets/team_headshots/meera.jpg',
    'Jordan': '/assets/team_headshots/jordan.jpg',
    'Aarfan': '/assets/team_headshots/aarfan.jpg',
    'Sanjana': '/assets/team_headshots/sanjana.jpg',
    'Victor': '/assets/team_headshots/victor.jpg',
    'Areej': '/assets/team_headshots/areej.jpeg',
    'Danielle': '/assets/team_headshots/danielle.jpeg',
    'Ryan': '/assets/team_headshots/ryan.png',
  };
  return images[name] || '/assets/team_headshots/dubs.jpg';
};

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { name: 'Anshul', role: 'Managing Director' },
    { name: 'Sthiti', role: 'Managing Director' },
    { name: 'Meera', role: 'Director of Projects' },
    { name: 'Jordan', role: 'Director of Projects' },
    { name: 'Aarfan', role: 'EiR Director' },
    { name: 'Sanjana', role: 'Director of Community' },
    { name: 'Victor', role: 'Director of Technology' },
    { name: 'Areej', role: 'Director of Marketing' },
    { name: 'Danielle', role: 'Director of Marketing' },
    { name: 'Ryan', role: 'Advisor' }
  ];

  return (
    <section id="team" className="bg-white py-section px-6 md:px-12">
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

        {/* First Row - 5 members */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8 md:mb-12">
          {teamMembers.slice(0, 5).map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group w-[calc(50%-1rem)] md:w-[220px]"
            >
              <div className="relative mb-6 overflow-hidden">
                <div className="w-full aspect-square bg-lightGray border border-gray-200 group-hover:border-pink group-hover:border-[3px] transition-all duration-300">
                  <img
                    src={getTeamMemberImage(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-neutral-900 font-light text-lg mb-2">{member.name}</h3>
              <p className="text-gray text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Second Row - 5 members */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {teamMembers.slice(5, 10).map((member, index) => (
            <motion.div
              key={index + 5}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 5) * 0.1 }}
              viewport={{ once: true }}
              className="text-center group w-[calc(50%-1rem)] md:w-[220px]"
            >
              <div className="relative mb-6 overflow-hidden">
                <div className="w-full aspect-square bg-lightGray border border-gray-200 group-hover:border-pink group-hover:border-[3px] transition-all duration-300">
                  <img
                    src={getTeamMemberImage(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
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