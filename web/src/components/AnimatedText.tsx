import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Fragment, useMemo, useRef, type CSSProperties } from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

type AnimatedCharacterProps = {
  character: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function AnimatedCharacter({
  character,
  progress,
  range,
}: AnimatedCharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span style={{ opacity: 0 }}>{character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className = '',
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const step = 1 / Math.max(text.length - 1, 1);

  // Group characters into words so lines only break between words,
  // never mid-word, while each character keeps its own scroll range.
  const words = useMemo(() => {
    let start = 0;

    return text.split(' ').map((word) => {
      const entry = { word, start };
      start += word.length + 1;
      return entry;
    });
  }, [text]);

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((entry, wordIndex) => (
        <Fragment key={`${entry.word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(entry.word).map((character, charIndex) => {
              const index = entry.start + charIndex;

              return (
                <AnimatedCharacter
                  key={`${character}-${index}`}
                  character={character}
                  progress={scrollYProgress}
                  range={[index * step, (index + 1) * step]}
                />
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  );
}