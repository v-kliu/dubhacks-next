import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const goToSection = (href: string) => {
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

  // Flat list for the mobile menu: section links plus both directory pages
  const mobileLinks = navItems.flatMap((item) =>
    item.hasDropdown && item.dropdownItems
      ? item.dropdownItems
      : [{ name: item.name, href: item.href ?? '/' }]
  );

  // Check if we're on a directory page (which has black header)
  const isDirectoryPage = location.pathname === '/startup-directory' || location.pathname === '/founder-directory';

  // The bar is solid (light) when scrolled or when the mobile menu is open, so text must be dark
  const isSolid = isScrolled || isMobileMenuOpen;
  const linkColor = isSolid || !isDirectoryPage
    ? 'text-neutral-700 hover:text-primary-600'
    : 'text-white hover:text-primary-400';
  const brandColor = isSolid || !isDirectoryPage ? 'text-neutral-900' : 'text-white';
  const mobileLinkClass =
    'flex items-center min-h-[44px] py-2 text-base text-neutral-800 hover:text-primary-600 transition-colors duration-200';

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-primary-100'
          : isScrolled
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
              className={`font-light text-lg tracking-wide transition-colors hover:text-primary-400 ${brandColor}`}
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
                    className={`transition-all duration-300 relative group flex items-center space-x-1 px-2 py-1 -mx-2 -my-1 ${linkColor}`}
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.href) goToSection(item.href);
                    }}
                    className={`transition-all duration-300 relative group ${linkColor}`}
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

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-lg transition-colors duration-300 ${linkColor}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col border-t border-primary-100 py-2">
                {mobileLinks.map((link) =>
                  link.href.startsWith('#') ? (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        // Scroll once the panel has collapsed: the closing animation cancels a scroll started in the same tick
                        window.setTimeout(() => goToSection(link.href), 300);
                      }}
                      className={mobileLinkClass}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileLinkClass}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
