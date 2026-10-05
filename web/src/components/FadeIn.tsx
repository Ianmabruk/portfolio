import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMemo, type ElementType, type ReactNode } from 'react';

type MotionTag = typeof motion.div;

export type FadeInProps = {
  children: ReactNode;
  /** Dynamic element type, e.g. "div", "section", "li" */
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...rest
}: FadeInProps) {
  const Component = useMemo(
    () => motion.create(as) as unknown as MotionTag,
    [as],
  );

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}