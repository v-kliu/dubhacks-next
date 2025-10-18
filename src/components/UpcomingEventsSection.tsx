import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Info } from 'lucide-react';

interface Event {
  date: string;
  displayDate: string;
  title: string;
  location?: string;
  description: string;
  highlight?: boolean;
}

const UpcomingEventsSection: React.FC = () => {
  const events: Event[] = [
    {
      date: '2025-10-22',
      displayDate: 'Oct 22',
      title: 'Shark Tank Event',
      location: 'DEN 303',
      description: 'Come for the fun, stay for the chance to network, learn more about NEXT, and unleash your inner entrepreneur! Winners get an automatic first round interview.',
      highlight: true
    },
    {
      date: '2025-10-27',
      displayDate: 'Oct 27',
      title: 'Sweec × NEXT Event',
      description: 'More information coming soon!'
    },
    {
      date: '2025-10-28',
      displayDate: 'Oct 28',
      title: 'Women in Entrepreneurship Event',
      description: 'More information coming soon!'
    }
  ];

  return (
    <section id="events" className="bg-white py-8 md:py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="overline text-primary-600 mb-3 inline-block px-4 py-2 bg-primary-100/50 rounded-full">
            UPCOMING EVENTS
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-neutral-900">Mark Your Calendar</h2>
          <p className="text-neutral-600 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Join us for exciting events designed to help you connect, learn, and grow as an entrepreneur.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-[80px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"></div>

            {/* Events */}
            <div className="space-y-6 md:space-y-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                    {/* Timeline dot - placed BEHIND the date badge */}
                    <div className="hidden md:block absolute left-[73px] top-[18px] w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-lg -z-10"></div>

                    {/* Date badge */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`flex items-center justify-center w-[140px] md:w-[160px] px-4 py-3 rounded-lg border-2 ${
                        event.highlight
                          ? 'bg-primary-500 border-primary-600 text-white'
                          : 'bg-white border-primary-200 text-neutral-900'
                      }`}>
                        <Calendar size={20} className="mr-2" />
                        <span className="font-medium text-sm md:text-base">{event.displayDate}</span>
                      </div>
                    </div>

                    {/* Event content */}
                    <div className={`flex-1 p-4 md:p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                      event.highlight
                        ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 hover:border-primary-300'
                        : 'bg-white border-neutral-200 hover:border-primary-200'
                    }`}>
                      <h3 className="text-lg md:text-xl font-semibold text-neutral-900 mb-2">
                        {event.title}
                      </h3>

                      {event.location && (
                        <div className="flex items-center text-neutral-600 mb-2">
                          <MapPin size={16} className="mr-2 text-primary-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}

                      <div className="flex items-start text-neutral-700">
                        <Info size={16} className="mr-2 mt-1 text-primary-500 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {event.highlight && (
                        <div className="mt-3 pt-3 border-t border-primary-200">
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                            Featured Event
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
