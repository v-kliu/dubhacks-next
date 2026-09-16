import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MailingListForm from './MailingListForm';

// Standalone mailing list sign-up page at /join. This is what the printed QR code
// points at, so it skips the home page intro and goes straight to the form.
const JoinPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 px-4 md:px-6 pt-28 pb-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="overline text-primary-600 mb-4 inline-block px-4 py-2 bg-primary-100/50 rounded-full">
          DUBHACKS NEXT
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-neutral-900">Stay in the Loop</h1>
        <p className="text-neutral-600 text-sm md:text-base mt-3 max-w-md mx-auto">
          Events, applications, and opportunities from UW's student startup incubator, straight to your inbox.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full max-w-md bg-white rounded-2xl border-2 border-primary-200 shadow-xl p-6 md:p-8"
      >
        <MailingListForm titleId="join-title" />
      </motion.div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center min-h-[44px] text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200"
      >
        Learn more about DubHacks Next →
      </Link>
    </div>
  );
};

export default JoinPage;
