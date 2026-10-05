import type { ApiResponse, Project, Service, SiteSettings } from './types';

/**
 * The public portfolio reads all content from the existing Mabrix API that backs
 * the admin dashboard. In development Vite proxies /api and /uploads to the API
 * server; in production set VITE_API_URL / VITE_UPLOADS_URL.
 */
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';
const UPLOADS_BASE = (import.meta.env.VITE_UPLOADS_URL as string | undefined) ?? '';

/** Turns a stored image reference into a loadable URL. */
export function resolveAssetUrl(value: string | null | undefined): string {
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  if (value.startsWith('/')) return `${UPLOADS_BASE}${value}`;
  return `${UPLOADS_BASE}/${value}`;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;
    throw new ApiError('Unable to reach the server. Please try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Content not found.' : 'Unable to load content. Please try again.',
      response.status,
    );
  }

  const payload = (await response.json()) as ApiResponse<T>;
  if (!payload.success) {
    throw new ApiError(payload.message ?? 'Unable to load content.', response.status);
  }

  return payload.data;
}

export const api = {
  getProjects: (signal?: AbortSignal) => request<Project[]>('/portfolio', signal),
  getServices: (signal?: AbortSignal) => request<Service[]>('/services', signal),
  getSettings: (signal?: AbortSignal) => request<SiteSettings>('/settings', signal),
};

/**
 * Site settings are requested by several sections but change rarely, so the
 * in-flight/settled promise is shared instead of issuing duplicate requests.
 */
let settingsRequest: Promise<SiteSettings> | null = null;

export function getSiteSettings(): Promise<SiteSettings> {
  if (!settingsRequest) {
    settingsRequest = request<SiteSettings>('/settings').catch((error) => {
      settingsRequest = null;
      throw error;
    });
  }
  return settingsRequest;
}

/** Only absolute URLs are used for outbound links; broken values are ignored. */
export function resolveExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return null;
  }
}