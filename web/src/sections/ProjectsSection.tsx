import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { api, resolveAssetUrl, resolveExternalUrl } from '../lib/api';
import type { Project } from '../lib/types';

const IMG_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

type Status = 'loading' | 'ready' | 'error';

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className={`flex w-full items-center justify-center border border-dashed border-[rgba(215,226,234,0.25)] ${IMG_RADIUS}`}
      style={{ height: '100%' }}
    >
      <span className="px-3 text-center text-[0.65rem] font-light uppercase tracking-widest text-[#D7E2EA] opacity-40">
        {label}
      </span>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  totalCards: number;
};

function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const liveUrl = resolveExternalUrl(project.project_url);
  const gallery = [...project.images]
    .sort((a, b) => a.ordering - b.ordering || a.id - b.id)
    .map((image) => resolveAssetUrl(image.image_url))
    .filter(Boolean);

  const cover = resolveAssetUrl(project.cover_image);
  const leftTop = gallery[0] ?? cover;
  const leftBottom = gallery[1] ?? cover;
  const rightTall = gallery[2] ?? cover;

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        style={
          {
            scale,
            transformOrigin: 'top center',
            '--card-offset': `${index * 28}px`,
          } as unknown as MotionStyle
        }
        className={`sticky top-[calc(6rem+var(--card-offset,0px))] md:top-[calc(8rem+var(--card-offset,0px))] ${IMG_RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
      >
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <span
            className={`hero-heading shrink-0 font-black leading-none ${IMG_RADIUS}`}
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1 sm:gap-2 md:pt-4">
            <span
              className="text-xs font-light uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm"
              style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
            >
              {project.client || project.category}
            </span>
            <h3
              className="truncate font-medium uppercase leading-tight text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1.25rem, 3.4vw, 3rem)' }}
            >
              {project.title}
            </h3>
          </div>

          <LiveProjectButton
            href={liveUrl ?? undefined}
            className="shrink-0 px-5 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5"
          />
        </div>

        <div className="mt-4 flex gap-3 sm:mt-6 md:mt-8">
          <div className="flex w-[40%] flex-col gap-3">
            {leftTop ? (
              <img
                src={leftTop}
                alt={`${project.title} preview`}
                loading="lazy"
                className={`w-full object-cover ${IMG_RADIUS}`}
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
            ) : (
              <div style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                <Placeholder label="No image" />
              </div>
            )}

            {leftBottom ? (
              <img
                src={leftBottom}
                alt={`${project.title} preview`}
                loading="lazy"
                className={`w-full object-cover ${IMG_RADIUS}`}
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            ) : (
              <div style={{ height: 'clamp(160px, 22vw, 340px)' }}>
                <Placeholder label="No image" />
              </div>
            )}
          </div>

          <div className="w-[60%]">
            {rightTall ? (
              <img
                src={rightTall}
                alt={`${project.title} preview`}
                loading="lazy"
                className={`h-full w-full object-cover ${IMG_RADIUS}`}
              />
            ) : (
              <Placeholder label="No image" />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();

    api
      .getProjects(controller.signal)
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') return;
        setStatus('error');
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-24 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"
    >
      <FadeIn y={40} className="mb-12 text-center sm:mb-16 md:mb-20">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative">
        {status === 'loading' && (
          <p
            className="py-20 text-center font-light uppercase tracking-widest text-[#D7E2EA] opacity-50"
            style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
          >
            Loading projects…
          </p>
        )}

        {status === 'error' && (
          <p
            className="py-20 text-center font-light uppercase tracking-widest text-[#D7E2EA] opacity-50"
            style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
          >
            Unable to load projects. Please try again later.
          </p>
        )}

        {status === 'ready' && projects.length === 0 && (
          <p
            className="py-20 text-center font-light uppercase tracking-widest text-[#D7E2EA] opacity-50"
            style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
          >
            No projects published yet.
          </p>
        )}

        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}