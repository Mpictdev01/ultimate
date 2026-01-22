// Database Types for Ultimate Autoshop Admin Panel

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Feature {
  id: string;
  icon_url: string | null;
  title: string;
  description: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  icon_url: string | null;
  title: string;
  description: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
  featured: boolean;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_date: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimoni {
  id: string;
  image_url: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileGallery {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  maps_url: string | null;
  phone: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form Types
export type FeatureFormData = Omit<Feature, 'id' | 'created_at' | 'updated_at'>;
export type ServiceFormData = Omit<Service, 'id' | 'created_at' | 'updated_at'>;
export type PortfolioFormData = Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>;
export type ArticleFormData = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type TestimoniFormData = Omit<Testimoni, 'id' | 'created_at' | 'updated_at'>;
export type ProfileGalleryFormData = Omit<ProfileGallery, 'id' | 'created_at' | 'updated_at'>;
export type BranchFormData = Omit<Branch, 'id' | 'created_at' | 'updated_at'>;
