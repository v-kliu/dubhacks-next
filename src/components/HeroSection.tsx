import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const stats = [
    { value: '$5M+', label: 'Raised' },
    { value: '68', label: 'Startups' },
    { value: '4', label: 'Batches' }
  ];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentDeadline, setCurrentDeadline] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Convert PST deadlines to UTC (PST is UTC-7 during PDT, UTC-8 during PST standard time)
      // October is during PDT (UTC-7)
      const applicationsOpen = new Date('2025-10-18T07:00:00Z'); // 12:00 AM PST = 7:00 AM UTC
      const priorityDeadline = new Date('2025-10-26T06:59:00Z'); // 11:59 PM PST = 6:59 AM UTC next day
      const regularDeadline = new Date('2025-11-03T07:59:00Z'); // 11:59 PM PST = 7:59 AM UTC next day

      let targetDate;
      let deadlineLabel;

      if (now < applicationsOpen) {
        targetDate = applicationsOpen;
        deadlineLabel = 'Applications Open';
      } else if (now < priorityDeadline) {
        targetDate = priorityDeadline;
        deadlineLabel = 'Priority Deadline';
      } else if (now < regularDeadline) {
        targetDate = regularDeadline;
        deadlineLabel = 'Regular Deadline';
      } else {
        setCurrentDeadline('Applications Closed');
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      setCurrentDeadline(deadlineLabel);

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
      <div className="grid-overlay"></div>

      <div className="content-grid min-h-screen">
        <div className="guide-line pl-4 md:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center min-h-screen py-12 md:py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                className="hidden lg:grid grid-cols-1 gap-3 md:gap-6 lg:gap-8 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/90 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-2 border-primary-200 shadow-lg shadow-primary-500/10 card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-600 mb-1 md:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-base text-neutral-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="space-y-6 md:space-y-8 lg:order-1">
                <div className="overline text-primary-600 mb-2 inline-block px-4 py-2 bg-primary-100/50 rounded-full">
                  UNIVERSITY OF WASHINGTON
                </div>

                <h1 className="hero-text text-neutral-900 leading-tight">
                  Building{' '}
                  <span className="pink-underline text-primary-600">Tomorrow's</span>{' '}
                  Founders
                </h1>

                <p className="text-neutral-600 text-base md:text-lg lg:text-subhead max-w-xl leading-relaxed">
                  A 16-week program transforming exceptional UW students into funded startup founders 
                  through intensive mentorship, resources, and community at UW's Top Startup Incubator.
                </p>

                {/* Countdown Timer */}
                {currentDeadline && currentDeadline !== 'Applications Closed' && (
                  <motion.div
                    className="mt-6 md:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <div className="inline-block bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-xl p-4 md:p-6 shadow-lg shadow-primary-500/10">
                      <div className="text-xs md:text-sm text-primary-600 font-medium mb-2 md:mb-3 text-center">
                        {currentDeadline}
                      </div>
                      <div className="flex gap-2 md:gap-4">
                        <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-600 mb-1">
                            {timeLeft.days}
                          </div>
                          <div className="text-xs md:text-sm text-neutral-600 font-medium">Days</div>
                        </div>
                        <div className="text-2xl md:text-3xl lg:text-4xl text-primary-600 font-light self-start">:</div>
                        <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-600 mb-1">
                            {String(timeLeft.hours).padStart(2, '0')}
                          </div>
                          <div className="text-xs md:text-sm text-neutral-600 font-medium">Hours</div>
                        </div>
                        <div className="text-2xl md:text-3xl lg:text-4xl text-primary-600 font-light self-start">:</div>
                        <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-600 mb-1">
                            {String(timeLeft.minutes).padStart(2, '0')}
                          </div>
                          <div className="text-xs md:text-sm text-neutral-600 font-medium">Mins</div>
                        </div>
                        <div className="text-2xl md:text-3xl lg:text-4xl text-primary-600 font-light self-start">:</div>
                        <div className="flex flex-col items-center min-w-[3rem] md:min-w-[4rem]">
                          <div className="text-2xl md:text-3xl lg:text-4xl font-light text-primary-600 mb-1">
                            {String(timeLeft.seconds).padStart(2, '0')}
                          </div>
                          <div className="text-xs md:text-sm text-neutral-600 font-medium">Secs</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="mt-8 md:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      const tracksSection = document.getElementById('tracks');
                      if (tracksSection) {
                        tracksSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-primary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 transform hover:scale-105 w-full sm:w-auto text-sm md:text-base"
                  >
                    Apply for Batch 5
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;