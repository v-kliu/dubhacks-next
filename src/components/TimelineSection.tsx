import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TimelineSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // Drives the horizontal line on laptop and the vertical line on mobile
  const linePercent = useTransform(lineProgress, (v) => `${v}%`);

  const milestones = [
    {
      week: 'WEEK 1-3',
      title: 'Kickoff',
      description: 'Program launch, team formation, and initial idea validation'
    },
    {
      week: 'WEEK 4-7',
      title: 'Build',
      description: 'MVP development, customer interviews, and market research'
    },
    {
      week: 'WEEK 8-11',
      title: 'Validate',
      description: 'Product testing, user feedback, and business model refinement'
    },
    {
      week: 'WEEK 12-15',
      title: 'Scale',
      description: 'Growth strategy, fundraising prep, and investor connections'
    },
    {
      week: 'WEEK 16',
      title: 'Demo Day',
      description: 'Present to investors, celebrate achievements, and launch forward'
    }
  ];

  return (
    <section ref={ref} className="bg-charcoal py-16 md:py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="overline text-pink mb-6">THE JOURNEY</div>
          <h2 className="section-title text-white">16 Weeks. 5 Milestones.</h2>
        </motion.div>

        <div className="relative">
          {/* Tablet and up: horizontal line across the top */}
          <div className="hidden md:block absolute top-0 left-0 right-0 h-0.5 bg-white/20"></div>
          <motion.div
            className="hidden md:block absolute top-0 left-0 h-0.5 bg-pink z-10"
            style={{ width: linePercent }}
          />

          {/* Mobile: vertical line down the left edge */}
          <div className="md:hidden absolute top-0 bottom-0 left-2 w-0.5 bg-white/20"></div>
          <motion.div
            className="md:hidden absolute top-0 left-2 w-0.5 bg-pink z-10"
            style={{ height: linePercent }}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-0 relative md:pt-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-10 text-left md:pl-0 md:text-center"
              >
                {/* Bullet point - sits on the vertical line on mobile, centered on the top line on tablet and up */}
                <div
                  className="absolute top-0 left-2 -translate-x-1/2 md:-top-12 md:left-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full border-2 bg-charcoal border-pink z-20"
                />
                
                <div className="md:pt-4">
                  <div className="overline text-pink mb-3">{milestone.week}</div>
                  <h3 className="text-xl font-light text-white mb-3">{milestone.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
