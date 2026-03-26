// Directus CMS TypeScript interfaces

export interface DirectusEvent {
  id: string;
  status: 'published' | 'draft' | 'archived';
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  flag_emoji: string;
  description: string;
  cover_image: string | DirectusFile | null;
  gallery: DirectusEventFile[];
  tags: string[];
  featured: boolean;
  show_scoreboard: boolean;
  phoenix_event_id: string | null;
  phoenix_api_url: string | null;
  sort: number;
}

export interface DirectusFile {
  id: string;
  filename_download: string;
  title: string | null;
  type: string;
}

export interface DirectusEventFile {
  id: string;
  directus_files_id: string | DirectusFile;
}

export interface DirectusTestimonial {
  id: string;
  status: 'published' | 'draft';
  quote: string;
  author_name: string;
  author_role: string;
  author_initials: string;
  sort: number;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface ScoreboardEntry {
  pos: number;
  name: string;
  time: string;
  gap: string;
}
