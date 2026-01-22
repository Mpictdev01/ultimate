-- 1. Enable RLS on all tables used by the application
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimoni ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies to allow Public Read Access (SELECT)
-- This allows the website (which connects as 'anon') to fetch data.

CREATE POLICY "Public Read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public Read features" ON features FOR SELECT USING (true);
CREATE POLICY "Public Read testimoni" ON testimoni FOR SELECT USING (true);
CREATE POLICY "Public Read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read settings" ON settings FOR SELECT USING (true);

-- 3. Policy for Admin Users (Login)
-- PERINGATAN: Ini membuat tabel admin_users bisa dibaca publik (diperlukan agar login script saat ini bisa cek email).
-- Karena logic login ada di server API Next.js yang menggunakan Anon Key, ia butuh akses baca ini.
CREATE POLICY "Public Read admin_users" ON admin_users FOR SELECT USING (true);

-- Note: Untuk operasi Tulis/Ubah/Hapus (INSERT/UPDATE/DELETE), biasanya dilakukan di Admin Panel.
-- Jika Admin Panel juga menggunakan client yang sama, Anda mungkin perlu Policy tambahan atau menggunakan Service Role Key di server.
