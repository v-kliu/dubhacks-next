import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

// Shared mailing list sign-up form. Used inside MailingListModal on the home page
// and on the standalone /join page (the QR code landing page). Submissions go to
// api/subscribe.ts, which stores them in the Supabase `mailing_list` table.

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface SubscribeResponse {
  ok?: boolean;
  duplicate?: boolean;
  error?: string;
}

interface MailingListFormProps {
  /** Rendered as a "Done" button on the success screen when provided */
  onDone?: () => void;
  /** id for the heading, so a dialog can point aria-labelledby at it */
  titleId?: string;
}

const inputClass =
  'w-full min-h-[44px] px-4 py-2.5 rounded-lg border-2 border-neutral-200 bg-white text-neutral-900 text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-colors duration-200';

const MailingListForm: React.FC<MailingListFormProps> = ({ onDone, titleId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, hidden from people
  const [status, setStatus] = useState<Status>('idle');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, major, website }),
      });
      const data: SubscribeResponse = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setIsDuplicate(Boolean(data.duplicate));
      setStatus('success');
    } catch {
      setErrorMessage('Could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
          <CheckCircle size={28} />
        </div>
        <h3 className="text-2xl font-light text-neutral-900 mb-2">
          {isDuplicate ? "You're already on the list!" : "You're on the list!"}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed mb-6">
          {isDuplicate
            ? 'That email is already signed up, so nothing new was added. You\'re all set.'
            : "We'll keep you posted on events, applications, and opportunities."}
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-2 pr-10">
        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
          <Mail size={24} />
        </div>
        <h3 id={titleId} className="text-2xl font-light text-neutral-900">
          Join the Mailing List
        </h3>
      </div>
      <p className="text-neutral-600 text-sm leading-relaxed mb-6">
        Stay updated with the latest news, events, and opportunities from DubHacks Next.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-sm font-medium text-neutral-700 mb-1">Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Dubs the Husky"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-neutral-700 mb-1">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            autoComplete="email"
            inputMode="email"
            placeholder="dubs@uw.edu"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-neutral-700 mb-1">Major / School</span>
          <input
            type="text"
            name="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
            maxLength={120}
            autoComplete="organization"
            placeholder="Computer Science, UW"
            className={inputClass}
          />
        </label>

        {/* Honeypot: invisible to people, bots tend to fill it */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {status === 'error' && (
          <p role="alert" className="text-sm text-accent-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full min-h-[44px] px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          {status === 'submitting' ? 'Signing you up…' : 'Sign Up'}
        </button>
      </form>
    </>
  );
};

export default MailingListForm;
