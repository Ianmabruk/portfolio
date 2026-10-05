import { ArrowUpRight } from 'lucide-react';

type LiveProjectButtonProps = {
  href?: string | null;
  className?: string;
};

const BASE_CLASS =
  'inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest sm:px-10 sm:py-3.5 sm:text-base';

/**
 * Renders a disabled state when a project has no valid live URL, so the card
 * never offers a dead link.
 */
export default function LiveProjectButton({ href, className = '' }: LiveProjectButtonProps) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="No live URL for this project"
        className={`${BASE_CLASS} cursor-not-allowed border-[rgba(215,226,234,0.35)] text-[rgba(215,226,234,0.45)] ${className}`}
      >
        Live Project
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE_CLASS} text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 ${className}`}
    >
      Live Project
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}