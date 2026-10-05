import { useEffect, useState } from 'react';
import { getSiteSettings } from './api';
import type { SiteSettings } from './types';

type SettingsState = {
  settings: SiteSettings | null;
  loading: boolean;
};

/** Reads site settings from the API, shared across all consumers. */
export default function useSiteSettings(): SettingsState {
  const [state, setState] = useState<SettingsState>({ settings: null, loading: true });

  useEffect(() => {
    let active = true;

    getSiteSettings()
      .then((settings) => {
        if (active) setState({ settings, loading: false });
      })
      .catch(() => {
        // Callers fall back to their defaults rather than rendering empty copy.
        if (active) setState({ settings: null, loading: false });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}