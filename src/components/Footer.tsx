import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-pink px-6 md:px-12 py-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-white font-light text-xl mb-4 tracking-wide">
            DUBHACKS NEXT
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
            Transforming exceptional UW students into exceptional founders 
            through intensive mentorship and community.
          </p>
          
          <div className="text-pink text-sm mb-4">
            Made with ❤️ by the DubHacks Next Team
          </div>
          
          <div className="text-white/60 text-sm mb-4">
            Contact us at next@dubhacks.co
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50"
        >
          <div>
            © 2025 DubHacks Next. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            A proud part of DubHacks • University of Washington
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;