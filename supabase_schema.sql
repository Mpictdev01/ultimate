-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: services
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    icon_url TEXT,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: portfolio
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: features
CREATE TABLE IF NOT EXISTS features (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    icon_url TEXT,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table: testimoni
CREATE TABLE IF NOT EXISTS testimoni (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table: articles
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    published_date TIMESTAMP WITH TIME ZONE,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Table: profile_gallery (DIFFERENT FROM API ROUTE NAME 'gallery')
CREATE TABLE IF NOT EXISTS profile_gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Table: site_settings (DIFFERENT FROM API ROUTE NAME 'settings')
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    type TEXT DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Table: admin_users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --- RLS POLICIES ---

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimoni ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid errors when re-running)
DROP POLICY IF EXISTS "Public Read services" ON services;
DROP POLICY IF EXISTS "Public Read portfolio" ON portfolio;
DROP POLICY IF EXISTS "Public Read features" ON features;
DROP POLICY IF EXISTS "Public Read testimoni" ON testimoni;
DROP POLICY IF EXISTS "Public Read articles" ON articles;
DROP POLICY IF EXISTS "Public Read profile_gallery" ON profile_gallery;
DROP POLICY IF EXISTS "Public Read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Public Read admin_users" ON admin_users;

-- Create Policies (Public Read)
CREATE POLICY "Public Read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public Read features" ON features FOR SELECT USING (true);
CREATE POLICY "Public Read testimoni" ON testimoni FOR SELECT USING (true);
CREATE POLICY "Public Read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read profile_gallery" ON profile_gallery FOR SELECT USING (true);
CREATE POLICY "Public Read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read admin_users" ON admin_users FOR SELECT USING (true);
