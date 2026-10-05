import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import FadeIn from '../components/FadeIn';
import useSiteSettings from '../lib/useSiteSettings';

const BASE = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

const FALLBACK_TEXT =
  'With more than two years of experience, i focus on web design, app development, and database management.';

const DECORATIONS = [
  {
    src: `${BASE}/moon_icon.11395d36.png`,
    alt: 'Moon 3D icon',
    delay: 0.1,
    x: -80,
    position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
  },
  {
    src: `${BASE}/lego_icon-1.703bb594.png`,
    alt: 'Lego 3D icon',
    delay: 0.15,
    x: 80,
    position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
  },
  {
    src: `${BASE}/p59_1.4659672e.png`,
    alt: '3D object',
    delay: 0.25,
    x: -80,
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    size: 'w-[100px] sm:w-[140px] md:w-[180px]',
  },
  {
    src: `${BASE}/Group_134-1.2e04f3ce.png`,
    alt: '3D object group',
    delay: 0.3,
    x: 80,
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    size: 'w-[130px] sm:w-[170px] md:w-[220px]',
  },
];

type AboutSectionProps = {
  onContact: () => void;
};

export default function AboutSection({ onContact }: AboutSectionProps) {
  const { settings, loading } = useSiteSettings();
  const bio = settings?.about_bio?.trim();
  const text = bio || FALLBACK_TEXT;

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
    >
      {DECORATIONS.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          duration={0.9}
          x={item.x}
          y={0}
          className={`pointer-events-none absolute select-none ${item.position} ${item.size}`}
        >
          <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
        </FadeIn>
      ))}

      <FadeIn
        delay={0}
        y={40}
        className="relative z-10 mb-10 text-center sm:mb-14 md:mb-16"
      >
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      {!loading || settings ? (
        <AnimatedText
          key={text}
          text={text}
          className="relative z-10 max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
      ) : (
        <div className="h-[6rem] w-full max-w-[560px]" aria-hidden="true" />
      )}

      <FadeIn delay={0.2} y={30} className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <ContactButton onClick={onContact} />
      </FadeIn>
    </section>
  );
}