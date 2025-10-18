import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  name: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      // Store the target section in sessionStorage
      sessionStorage.setItem('scrollToSection', href);
      navigate('/');
    } else {
      // If we're already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Check for stored scroll target after navigation
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollToSection');
    if (scrollTarget && location.pathname === '/') {
      // Clear the stored value
      sessionStorage.removeItem('scrollToSection');

      // Wait for page to fully render
      const scrollToElement = () => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      };

      // Try multiple times to ensure element is loaded
      setTimeout(scrollToElement, 100);
      setTimeout(scrollToElement, 500);
    }
  }, [location]);

  const navItems: NavItem[] = [
    { name: 'About', href: '#program' },
    { name: 'Tracks', href: '#tracks' },
    { 
      name: 'Directory', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Startup Directory', href: '/startup-directory' },
        { name: 'Founder Directory', href: '/founder-directory' }
      ]
    },
    { name: 'Team', href: '#team' },
    { name: 'Apply', href: '#apply' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-primary-100' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="content-grid">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img
              src="/dubhacksnext.png"
              alt="DubHacks Next"
              className="w-8 h-8 object-contain"
            />
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`font-light text-lg tracking-wide transition-colors hover:text-primary-600 ${
                isScrolled ? 'text-neutral-900' : 'text-neutral-900'
              }`}
            >
              DUBHACKS NEXT
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                {item.hasDropdown ? (
                  <button
                    className={`transition-all duration-300 relative group flex items-center space-x-1 px-2 py-1 -mx-2 -my-1 ${
                      isScrolled 
                        ? 'text-neutral-700 hover:text-primary-600' 
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => item.href && handleNavClick(e, item.href)}
                    className={`transition-all duration-300 relative group ${
                      isScrolled
                        ? 'text-neutral-700 hover:text-primary-600'
                        : 'text-neutral-700 hover:text-primary-600'
                    }`}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                )}
                {item.hasDropdown && item.dropdownItems && activeDropdown === item.name && (
                  <>
                    {/* Invisible hover bridge to prevent flicker */}
                    <div
                      className="absolute top-full left-0 right-0 h-4"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 bg-white rounded-lg shadow-xl border border-primary-100 py-3 min-w-52 z-50"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-5 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 text-sm font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;