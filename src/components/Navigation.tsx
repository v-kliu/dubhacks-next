import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Program', 'Alumni', 'Team', 'Apply'];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-primary-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2 }}
    >
      <div className="content-grid">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img
              src="/dubhacksnext.png"
              alt="DubHacks Next"
              className="w-8 h-8 object-contain"
            />
            <div className={`font-light text-lg tracking-wide transition-colors ${
              isScrolled ? 'text-neutral-900' : 'text-neutral-900'
            }`}>
              DUBHACKS NEXT
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-all duration-300 relative group pb-1 ${
                  isScrolled 
                    ? 'text-neutral-700 hover:text-primary-600' 
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;