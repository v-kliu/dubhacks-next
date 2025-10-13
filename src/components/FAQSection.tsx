import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How much does it cost to participate?',
      answer: 'DubHacks Next is an equity-free, cost-free program.'
    },
    {
      question: 'What are you looking for in applicants?',
      answer: 'See the overview for Entrepreneurs-in-Residence and Projects Tracks.'
    },
    {
      question: 'What is the time commitment of the program?',
      answer: 'As a participant of an ongoing batch, expect to commit at least 7-15 hours a week for scheduled content throughout the 16-week incubator, as well as the time you spend building your project. While the program concludes after 16 weeks, you\'ll get to be a part of the Next community for as long as you remain involved.'
    },
    {
      question: 'Who are Next\'s sponsors and partners?',
      answer: 'Next works with a variety of sponsors and partners who support student founders.'
    },
    {
      question: 'How long has Next been around?',
      answer: 'Batch 5 will be our 6th year running Next.'
    },  
    {
      question: 'Should I apply to the EiR or Project Track?',
      answer: 'If you are already working on something and are near MVP, apply to the Project Track. If you don’t quite have a product but want to explore the tech startup space and surround yourself with a vibrant community, apply as an Entrepreneur-in-Residence.'
    },
    {
      question: 'What is an Entrepreneur-in-Residence?',
      answer: 'Entrepreneurs-in-Residence, or EiRs for short, are individuals who come in without a project and are looking to learn more about tech startups to create their own in the future. Our EiRs are passionate builders who love meeting like-minded people interested in tech startups. We\'re looking for a diverse group of EiRs with skills across engineering, business, product, and design.'
    },
    {
      question: 'Do I need to be a UW student to participate?',
      answer: 'Our expectation is that EiR applicants are current UW students and that Project teams consist of a majority of UW students.'
    },
    {
      question: 'When are the application deadlines for Batch 5?',
      answer: 'We will be opening applications for EiRs and Projects to join Batch 5 starting October 18th. Priority applications are due October 24th. Regular applications are due November 1st.'
    },
    {
      question: '404: Question Not Found',
      answer: 'Reach out via email to next@dubhacks.co!'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftColumnFaqs = faqs.slice(0, 5);
  const rightColumnFaqs = faqs.slice(5, 10);

  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column */}
          <div className="space-y-2">
            {leftColumnFaqs.map((faq, index) => (
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

          {/* Right Column */}
          <div className="space-y-2">
            {rightColumnFaqs.map((faq, index) => (
              <motion.div
                key={index + 6}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 6) * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-gray/20 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index + 6)}
                  className="w-full py-4 flex items-center justify-between text-left hover:text-pink transition-colors duration-300"
                >
                  <span className="text-base font-medium text-neutral-900 pr-8">{faq.question}</span>
                  <div className="text-pink flex-shrink-0">
                    {openIndex === (index + 6) ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === (index + 6) ? 'auto' : 0,
                    opacity: openIndex === (index + 6) ? 1 : 0
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
      </div>
    </section>
  );
};

export default FAQSection;