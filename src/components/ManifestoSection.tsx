import React from 'react';
import { motion } from 'framer-motion';

const ManifestoSection: React.FC = () => {
  return (
    <section className="bg-charcoal py-section px-6 md:px-12">
      <div className="max-w-reading mx-auto">
        <div className="flex">
          <div className="w-1 h-24 bg-pink mr-12 flex-shrink-0"></div>
          <div className="flex-1">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="quote text-white font-light leading-tight mb-8"
            >
              "We exist to transform exceptional students into exceptional founders. 
              Through intensive mentorship, unparalleled resources, and a community 
              of ambitious builders, we accelerate the journey from idea to funded startup."
            </motion.blockquote>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <cite className="text-white/70 text-body not-italic">
                — DubHacks Next, Est. 2021
              </cite>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;