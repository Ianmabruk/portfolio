import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Phone, X } from 'lucide-react';
import { useEffect } from 'react';
import useSiteSettings from '../lib/useSiteSettings';

const FALLBACK_PHONE = '0115407200';
const FALLBACK_EMAIL = 'ianmabruk3@gmail.com';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { settings } = useSiteSettings();

  // Admin-managed contact details, falling back to the current values.
  const phone = settings?.contact_phone?.trim() || FALLBACK_PHONE;
  const email = settings?.contact_email?.trim() || FALLBACK_EMAIL;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Contact Mabruk"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:rounded-[50px] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact dialog"
              className="absolute right-5 top-5 rounded-full border-2 border-[#D7E2EA] p-2 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <h2
              className="hero-heading pr-12 font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 8vw, 3.5rem)' }}
            >
              Contact me
            </h2>

            <p
              className="mt-3 font-light leading-snug text-[#D7E2EA] opacity-70"
              style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
            >
              Call me or send an email, whichever suits you best.
            </p>

            <div className="mt-7 flex flex-col gap-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 rounded-[30px] border border-[rgba(215,226,234,0.2)] p-4 transition-colors hover:bg-[#D7E2EA]/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA]">
                  <Phone className="h-5 w-5 text-[#D7E2EA]" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA] opacity-60">
                    Phone
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA]"
                    style={{ fontSize: 'clamp(1rem, 2.4vw, 1.25rem)' }}
                  >
                    {phone}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 rounded-[30px] border border-[rgba(215,226,234,0.2)] p-4 transition-colors hover:bg-[#D7E2EA]/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA]">
                  <Mail className="h-5 w-5 text-[#D7E2EA]" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA] opacity-60">
                    Email
                  </span>
                  <span
                    className="truncate font-medium text-[#D7E2EA]"
                    style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)' }}
                  >
                    {email}
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}