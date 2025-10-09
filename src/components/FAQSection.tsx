import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who is eligible to apply to DubHacks Next?',
      answer: 'Current University of Washington students (undergraduate and graduate) from all majors and academic levels are eligible. We welcome students with and without prior startup experience.'
    },
    {
      question: 'Do you take equity in our startups?',
      answer: 'No, we do not take any equity in your startup. DubHacks Next is designed to support student entrepreneurs without financial strings attached, allowing you to maintain full ownership of your venture.'
    },
    {
      question: 'How much time commitment is required?',
      answer: 'Expect to dedicate 15-20 hours per week to the program, including mandatory weekly meetings, workshops, mentor sessions, and independent work on your startup.'
    },
    {
      question: 'Can I apply as a team?',
      answer: 'Yes, teams of 2-4 co-founders can apply together. Solo founders are also welcome and we can help with team formation during the program if desired.'
    },
    {
      question: 'How selective is the program?',
      answer: 'We accept approximately 15-20 students per batch from hundreds of applications, making it highly selective. We look for exceptional potential, commitment, and innovative ideas.'
    },
    {
      question: 'What happens after Demo Day?',
      answer: 'Demo Day is just the beginning. We provide continued mentorship, investor introductions, and alumni network access to support your startup\'s growth beyond the 16-week program.'
    },
    {
      question: 'Do I need a fully developed business idea to apply?',
      answer: 'Not necessarily. Our EIR Track is specifically designed for students who are passionate about entrepreneurship but still exploring ideas. The Project Track is for those with existing ventures.'
    },
    {
      question: 'What types of startups do you accept?',
      answer: 'We\'re industry-agnostic and welcome startups across all sectors - from deep tech and biotech to consumer apps and social impact ventures. What matters most is the potential for scalable impact.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-section px-6 md:px-12">
      <div className="max-w-reading mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-black">Frequently Asked</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-gray/20 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-pink transition-colors duration-300"
              >
                <span className="text-lg text-black pr-8">{faq.question}</span>
                <div className="text-pink flex-shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-6 pr-8">
                  <p className="text-gray text-body leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;