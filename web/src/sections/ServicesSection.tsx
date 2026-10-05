import { useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import { api } from '../lib/api';
import type { Service } from '../lib/types';

type Status = 'loading' | 'ready' | 'error';

const MESSAGE_CLASS =
  'py-16 text-center font-light uppercase tracking-widest text-[#0C0C0C] opacity-50';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();

    api
      .getServices(controller.signal)
      .then((data) => {
        setServices(
          (Array.isArray(data) ? data : []).filter((service) => service.active !== 0),
        );
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
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn y={40} className="mb-16 text-center sm:mb-20 md:mb-28">
        <h2
          className="font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto w-full max-w-5xl">
        {status === 'loading' && (
          <p className={MESSAGE_CLASS} style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}>
            Loading services…
          </p>
        )}

        {status === 'error' && (
          <p className={MESSAGE_CLASS} style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}>
            Unable to load services. Please try again later.
          </p>
        )}

        {status === 'ready' && services.length === 0 && (
          <p className={MESSAGE_CLASS} style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}>
            No services published yet.
          </p>
        )}

        {services.map((service, index) => (
          <FadeIn
            key={service.id}
            as="div"
            delay={index * 0.1}
            y={30}
            className="flex items-start gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-6 sm:py-10 md:py-12"
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-2 pt-1 sm:gap-3 md:pt-3">
              <h3
                className="font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.title}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}

        {services.length > 0 && (
          <div className="border-t border-[rgba(12,12,12,0.15)]" />
        )}
      </div>
    </section>
  );
}