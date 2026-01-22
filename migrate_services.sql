-- Migration script to populate 'services' table with initial data
-- Run this in Supabase SQL Editor

INSERT INTO services (title, description, icon_url, active, sort_order)
VALUES
  (
    'Projector Biled Headlamp',
    'Pemasangan dengan standard pemasangan yang sangat teliti, rapi dan cepat untuk memastikan tidak bocor, tidak berembun dan hasil sinar terang maksimal tanpa mengganggu pengguna jalan lain',
    '/images/icons/kon1.png',
    true,
    1
  ),
  (
    'Projector Biled Foglamp',
    'Hasil pemasangan di pastikan dapat memberikan hasil terang maksimal untuk membantu pencahayaan saat kondisi cuaca buruk maupun cuaca normal, dengan standard pemasangan yang tahan banjir sekalipun.',
    '/images/icons/kon2.png',
    true,
    2
  ),
  (
    'Mini Projector Grill',
    'Prosedur pemasangan yang minim merusak grill asli mobil, kuat terhadap goncangan dan tetap dapat memberikan hasil terang optimal untuk membantu pencahayaan dengan jarak maksimal.',
    '/images/icons/kon3.png',
    true,
    3
  ),
  (
    'Custom Modifikasi Lampu Lainnya',
    'Meliputi angel eyes, devil eyes, DRL, RGB, slim frame, black housing, dll yang di sesuaikan perkembangan dunia modifikasi perlampuan di tanah air.',
    '/images/icons/kon4.png',
    true,
    4
  );
