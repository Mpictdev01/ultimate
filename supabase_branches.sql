-- 1. Create table 'branches' if not exists (matching interface Branch)
CREATE TABLE IF NOT EXISTS branches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    maps_url TEXT,
    phone TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

-- 3. Allow Public Read Access
DROP POLICY IF EXISTS "Public Read branches" ON branches;
CREATE POLICY "Public Read branches" ON branches FOR SELECT USING (true);
