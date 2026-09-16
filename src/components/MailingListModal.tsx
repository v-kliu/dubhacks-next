import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MailingListForm from './MailingListForm';

interface MailingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// The form unmounts when the modal closes, so it always reopens fresh.
const MailingListModal: React.FC<MailingListModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mailing-list-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mailing-list-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md max-h-full overflow-y-auto bg-white rounded-2xl border-2 border-primary-200 shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200"
            >
              <X size={20} />
            </button>

            <MailingListForm onDone={onClose} titleId="mailing-list-title" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MailingListModal;
