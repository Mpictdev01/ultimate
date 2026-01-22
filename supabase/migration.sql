-- Ultimate Autoshop Admin Panel - Database Schema
-- Run this in Supabase SQL Editor

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Features Table
CREATE TABLE IF NOT EXISTS features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon_url VARCHAR(500),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon_url VARCHAR(500),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url VARCHAR(500),
  published_date DATE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimoni Table
CREATE TABLE IF NOT EXISTS testimoni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile Gallery Table
CREATE TABLE IF NOT EXISTS profile_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  maps_url VARCHAR(500),
  phone VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- You should change this password after first login!
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('admin@ultimateautoshop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/LbNO2TFGBZxKswBMW', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
('site_title', 'Ultimate Autoshop Semarang', 'text'),
('site_description', 'Spesialis Biled Projector & Modifikasi Lampu Mobil', 'text'),
('phone', '0895-1330-1689', 'text'),
('whatsapp', '6289513301689', 'text'),
('instagram', 'https://www.instagram.com/ultimateautoshopsemarang', 'url'),
('youtube', 'https://youtube.com/@ultadmin', 'url'),
('tiktok', 'https://www.tiktok.com/@ultimateautoshopsemarang', 'url'),
('facebook', 'https://www.facebook.com/ultimateautoshopsemarang', 'url'),
('tokopedia', 'https://www.tokopedia.com/ultimateautoshopsemarang', 'url')
ON CONFLICT (key) DO NOTHING;

-- Insert default branches
INSERT INTO branches (name, address, maps_url, phone, sort_order) VALUES
('Cabang 1', 'Jl Bukit Umbul No 2A, Sumurboto, Banyumanik, Kota Semarang', 'https://maps.app.goo.gl/hQoRy71nMUxXfdo29', '0895-1330-1689', 1),
('Cabang 2', 'Ruko, Jl. Padma Boulevard No.6 AA 2, Tambakharjo, Kec. Semarang Barat, Kota Semarang', 'https://maps.app.goo.gl/x7KzvNX7qousG3Ri8', NULL, 2)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_features_sort ON features(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON portfolio(sort_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_testimoni_sort ON testimoni(sort_order);
CREATE INDEX IF NOT EXISTS idx_profile_gallery_sort ON profile_gallery(sort_order);
