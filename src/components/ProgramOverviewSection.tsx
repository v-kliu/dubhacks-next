import React from 'react';
import { motion } from 'framer-motion';

const ProgramOverviewSection: React.FC = () => {
  const benefits = [
    'Weekly 1:1 mentorship with successful founders and VCs',
    'Access to $50K in AWS, GCP, and startup tool credits',
    'Direct introductions to investors and industry leaders'
  ];

  return (
    <section id="program" className="bg-white py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-3">
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="overline text-pink mb-4 inline-block px-4 py-2 bg-pink/10 rounded-full">THE PROGRAM</div>
                <h2 className="section-title text-neutral-900 mb-6">
                16 Weeks of
                <br />
                Intensive Growth
              </h2>
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray text-body leading-relaxed mb-12"
            >
              DubHacks Next is more than an accelerator — it's a transformation. 
              We take ambitious UW students with world-changing ideas and provide 
              the mentorship, resources, and community needed to build fundable startups.
            </motion.p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 bg-pink mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-gray text-body leading-relaxed">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] border border-pink rounded-lg overflow-hidden">
                <img
                  src="/assets/gallery_pictures/triage.jpg"
                  alt="Program participants presenting at Demo Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray text-sm mt-4 text-center">
                Demo Day: Teams presenting their startups to investors and mentors
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramOverviewSection;