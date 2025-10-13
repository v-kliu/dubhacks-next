import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, BookOpen, Users, Lightbulb } from 'lucide-react';

const ResourcesSection: React.FC = () => {
  const resources = [
    {
      title: 'Mailing List',
      description: 'Stay updated with the latest news, events, and opportunities',
      icon: Mail,
      link: 'https://mailchi.mp/dubhacks.co/next',
      color: 'primary'
    },
    {
      title: 'Pillars & Goals',
      description: 'Learn about our core values and what drives DubHacks Next',
      icon: Lightbulb,
      link: 'https://www.notion.so/dubhacks/Pillars-Goals-External-050c9348438c4eb1b9577ba64966a082',
      color: 'accent'
    },
    {
      title: 'Operations',
      description: 'Discover how we run the program and support our founders',
      icon: BookOpen,
      link: 'https://www.notion.so/dubhacks/Operations-External-f78db55af5e943388755523538cd0354',
      color: 'primary'
    },
    {
      title: 'Culture',
      description: 'Explore the community and culture that makes Next special',
      icon: Users,
      link: 'https://www.notion.so/dubhacks/Culture-External-075c6a33764f4a7eadba494afdd9ab83',
      color: 'accent'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 md:py-section px-4 md:px-6 lg:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="overline text-primary-600 mb-4 inline-block px-4 py-2 bg-primary-100/50 rounded-full">
            ADDITIONAL RESOURCES
          </div>
          <h2 className="section-title text-neutral-900 mb-4">Learn More About Us</h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Dive deeper into what makes DubHacks Next a unique community for student founders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {resources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-6 md:p-8 rounded-2xl border-2 border-primary-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary-400"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  resource.color === 'primary'
                    ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
                    : 'bg-accent-100 text-accent-600 group-hover:bg-accent-600 group-hover:text-white'
                } transition-all duration-300`}>
                  <resource.icon size={24} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <ExternalLink size={16} className="text-neutral-400 group-hover:text-primary-600 transition-colors duration-300" />
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
