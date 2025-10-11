import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who can apply?',
      answer: 'Current UW students from all majors. No prior startup experience required.'
    },
    {
      question: 'Do you take equity?',
      answer: 'No. We don\'t take any equity or ownership in your startup.'
    },
    {
      question: 'Time commitment?',
      answer: '15-20 hours per week including meetings, workshops, and independent work.'
    },
    {
      question: 'Can teams apply?',
      answer: 'Yes, teams of 2-4 founders welcome. Solo founders can also apply.'
    },
    {
      question: 'How selective is it?',
      answer: 'We accept ~20 students per batch from hundreds of applications.'
    },
    {
      question: 'Need a business idea?',
      answer: 'Not required. Our EIR Track helps you discover and validate ideas.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-4">FAQ</h2>
          <p className="text-neutral-600">Quick answers to common questions</p>
        </motion.div>

        <div className="space-y-2">
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
                className="w-full py-4 flex items-center justify-between text-left hover:text-pink transition-colors duration-300"
              >
                <span className="text-base font-medium text-neutral-900 pr-8">{faq.question}</span>
                <div className="text-pink flex-shrink-0">
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
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
                <div className="pb-4 pr-8">
                  <p className="text-neutral-600 text-sm leading-relaxed">{faq.answer}</p>
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