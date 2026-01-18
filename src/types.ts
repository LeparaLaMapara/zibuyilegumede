export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  client?: string;
  role?: string;
  youtubeId?: string;
  externalLink?: string;
}

export interface Client {
  name: string;
  logoUrl?: string; // Optional if we just list names
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export interface NavItem {
  label: string;
  path: string;
}