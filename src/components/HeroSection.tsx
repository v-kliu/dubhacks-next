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

      // HELLO NEW EXEC OF BATCH 6!!! go kill it this year :)) - victor
      const applicationsOpen = new Date('2025-10-18T07:00:00Z'); 
      const priorityDeadline = new Date('2025-10-25T06:59:59Z');
      const regularDeadline = new Date('2025-11-03T07:59:59Z'); 

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

                <motion.div
                  className="mt-6 md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="inline-block bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-xl p-4 md:p-6 shadow-lg shadow-primary-500/10">
                    <div className="text-sm md:text-base text-primary-600 font-medium text-center">
                      Applications for Batch 6 will open Autumn 2026!
                    </div>
                  </div>
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