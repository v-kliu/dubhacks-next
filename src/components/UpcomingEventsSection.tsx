import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarPlus, MapPin, Info, Clock, ExternalLink } from 'lucide-react';
import { googleCalendarLink } from '../utils/googleCalendarLink';

interface Event {
  /** YYYY-MM-DD */
  date: string;
  displayDate: string;
  title: string;
  /** Shown on the card, e.g. '2:00 PM – 3:30 PM' */
  time?: string;
  /** HH:MM 24-hour, for the calendar entry. Omit for an all-day entry (deadlines). */
  startTime?: string;
  endTime?: string;
  location?: string;
  /** Street address appended to the calendar location so it maps correctly */
  address?: string;
  description: string;
  signUpLink?: string;
  /** Where the calendar entry points people back to; defaults to the events section */
  moreInfoUrl?: string;
  highlight?: boolean;
}

const SITE_URL = 'https://next.dubhacks.co';
const ALLEN_CENTER_ADDRESS = 'Paul G. Allen Center for Computer Science & Engineering, 185 E Stevens Way NE, Seattle, WA 98195';

const todayKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const calendarLinkFor = (event: Event): string =>
  googleCalendarLink({
    title: `DubHacks Next: ${event.title}`,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.address ? `${event.location}, ${event.address}` : event.location,
    details: `${event.description}\n\nMore info: ${event.moreInfoUrl ?? `${SITE_URL}/#events`}`
  });

const UpcomingEventsSection: React.FC = () => {
  const events: Event[] = [
    {
      date: '2026-10-13',
      displayDate: 'Oct 13',
      title: 'Batch 6 Info Session',
      time: '10:00 AM',
      startTime: '10:00',
      endTime: '11:00',
      location: 'Allen Center 305',
      address: ALLEN_CENTER_ADDRESS,
      description: 'Learn what DubHacks Next is, what Batch 6 looks like for EiRs and Projects, and how to apply. Bring your questions and meet the team.',
      highlight: true
    },
    {
      date: '2026-10-19',
      displayDate: 'Oct 19',
      title: 'Batch 6 Applications Open',
      description: 'Applications for EiRs and Projects to join Batch 6 open today. Apply early to be considered in the priority round.',
      moreInfoUrl: `${SITE_URL}/#apply`
    },
    {
      date: '2026-10-23',
      displayDate: 'Oct 23',
      title: 'Shark Tank Event',
      time: '2:00 PM – 3:30 PM',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Allen Center 305',
      address: ALLEN_CENTER_ADDRESS,
      description: 'Pitch your startup Shark Tank style, or come watch fellow founders take the stage. Network with the NEXT community and compete for prizes.',
      highlight: true
    },
    {
      date: '2026-10-26',
      displayDate: 'Oct 26',
      title: 'Priority Application Deadline',
      description: 'Submit your application by October 26th to be reviewed in the priority round.',
      moreInfoUrl: `${SITE_URL}/#apply`
    },
    {
      date: '2026-11-02',
      displayDate: 'Nov 2',
      title: 'Applications Close',
      description: 'Final deadline for all Batch 6 EiR and Project applications.',
      moreInfoUrl: `${SITE_URL}/#apply`
    }
  ];

  const today = todayKey();

  return (
    <section id="events" className="scroll-mt-20 bg-white py-8 md:py-16 px-4 md:px-6 lg:px-12">
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
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-2"
            >
              <div className="inline-block px-8 py-4 bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl">
                <p className="text-neutral-700 font-light text-base md:text-lg">
                  Stay tuned for upcoming events and opportunities to come!
                </p>
              </div>
            </motion.div>
          ) : (
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

                      {event.time && (
                        <div className="flex items-center text-neutral-600 mb-2">
                          <Clock size={16} className="mr-2 text-primary-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center text-neutral-600 mb-2">
                          <MapPin size={16} className="mr-2 text-primary-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}

                      <div className="flex items-start text-neutral-700 mb-3">
                        <Info size={16} className="mr-2 mt-1 text-primary-500 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {(event.signUpLink || event.date >= today) && (
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {event.signUpLink && (
                            <a
                              href={event.signUpLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                              Sign Up Here
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {event.date >= today && (
                            <a
                              href={calendarLinkFor(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                              <CalendarPlus size={16} />
                              Add to Calendar
                            </a>
                          )}
                        </div>
                      )}

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
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
