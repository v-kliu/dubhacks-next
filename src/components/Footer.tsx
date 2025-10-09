import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Program', href: '#program' },
    { name: 'Alumni', href: '#alumni' },
    { name: 'Team', href: '#team' },
    { name: 'Apply', href: '#apply' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@dubhacksnext.com', label: 'Email' }
  ];

  return (
    <footer className="bg-darkBlack border-t border-pink px-6 md:px-12 py-16">
      <div className="max-w-content mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-white font-light text-xl mb-4 tracking-wide">
              DUBHACKS NEXT
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Transforming exceptional UW students into exceptional founders 
              through intensive mentorship and community.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="overline text-pink mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-pink transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="overline text-pink mb-6">CONNECT</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/70 hover:text-pink transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="mailto:hello@dubhacksnext.com"
                className="text-white/70 hover:text-pink transition-colors duration-300 text-sm"
              >
                hello@dubhacksnext.com
              </a>
            </div>
          </motion.div>
        </div>
        
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