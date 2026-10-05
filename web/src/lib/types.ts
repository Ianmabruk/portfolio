export type ProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  alt_text: string | null;
  ordering: number;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  challenge: string | null;
  solution: string | null;
  process: string | null;
  technologies: string | null;
  results: string | null;
  testimonial: string | null;
  year: number | null;
  project_url: string | null;
  github_url: string | null;
  status: string | null;
  cover_image: string | null;
  featured: number;
  active: number;
  ordering: number;
  images: ProjectImage[];
};

export type Service = {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  image: string | null;
  featured: number;
  ordering: number;
  active: number;
};

export type SiteSettings = Record<string, string | null>;

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};