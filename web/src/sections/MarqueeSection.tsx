import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW_ONE = IMAGES.slice(0, 11);
const ROW_TWO = IMAGES.slice(11);

const SCROLL_SPEED = 0.3;
const SCROLL_OFFSET = 200;

const triple = (items: string[]) => [...items, ...items, ...items];

type TileProps = {
  src: string;
  alt: string;
};

function Tile({ src, alt }: TileProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={420}
      height={270}
      className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ top: 0, viewportHeight: 0 });

  useEffect(() => {
    const measure = () => {
      setMetrics({
        top: sectionRef.current?.offsetTop ?? 0,
        viewportHeight: window.innerHeight,
      });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollY } = useScroll();

  const rowOneX = useTransform(scrollY, (value) => {
    const offset = (value - metrics.top + metrics.viewportHeight) * SCROLL_SPEED;
    return offset - SCROLL_OFFSET;
  });

  const rowTwoX = useTransform(scrollY, (value) => {
    const offset = (value - metrics.top + metrics.viewportHeight) * SCROLL_SPEED;
    return -(offset - SCROLL_OFFSET);
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <motion.div
          className="flex gap-3"
          style={{ x: rowOneX, willChange: 'transform' }}
        >
          {triple(ROW_ONE).map((src, index) => (
            <Tile key={`row1-${index}`} src={src} alt="3D project showcase" />
          ))}
        </motion.div>

        <motion.div
          className="flex gap-3"
          style={{ x: rowTwoX, willChange: 'transform' }}
        >
          {triple(ROW_TWO).map((src, index) => (
            <Tile key={`row2-${index}`} src={src} alt="3D project showcase" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}