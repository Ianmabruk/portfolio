import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Price', href: '#services' },
  { label: 'Projects', href: '#projects' },
];

const PORTRAIT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

type HeroSectionProps = {
  onContact: () => void;
};

const NAV_LINK_CLASS =
  'text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]';

export default function HeroSection({ onContact }: HeroSectionProps) {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn as="nav" y={-20} delay={0} className="w-full">
        <div className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={NAV_LINK_CLASS}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onContact}
            className={`cursor-pointer ${NAV_LINK_CLASS}`}
          >
            Contact
          </button>
        </div>
      </FadeIn>

      <div className="relative flex flex-1 items-center overflow-hidden">
        <FadeIn delay={0.15} y={40} className="relative z-20 w-full">
          <div className="overflow-hidden">
            <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-[11vw] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-5">
              Hi, i&apos;m ian mabruk
            </h1>
          </div>
        </FadeIn>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
          <FadeIn delay={0.6} y={30} className="pointer-events-auto flex justify-center">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <img
                src={PORTRAIT_URL}
                alt="Ian Mabruk, software developer"
                className="w-[280px] select-none sm:w-[360px] md:w-[440px] lg:w-[520px]"
                draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>

      <div className="flex items-end justify-between px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a software developer turning every dream and thought into profitable, effortless tools for your everyday
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContact} />
        </FadeIn>
      </div>
    </section>
  );
}